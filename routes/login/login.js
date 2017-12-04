const express = require('express');
const router = express.Router();

const models = require('../../models');
const User = models.User;
const Portfolio = models.Portfolio;
const Account = models.Account;
const AssetClass = models.AssetClass;
const Equity = models.Equity;
const Index = models.Index;
const Future = models.Future;
const Option = models.Option;

router.get('/', function(req, res){
	res.status(200).json({});
})

// GET /:_username


router.get('/:_username', function(req, res) {

    let uname = req.params._username;
    let userData = {};

    User.findOne({'name' : uname}, function(err, found) {

        if (err || found == null) 
            res.status(404).end();           
        else {
            sendUserData(found, res);
        }
    }); 
});



function sendUserData(userObject, res) {

    let userData = {user : userObject, accounts: []};

    addPortfolios();

    function addPortfolios() {

        Portfolio.find({ "symbol" : { $in : userObject.portfolios } }, 
            
            function(err, found) {
                
                if (err) throw err;

                userData.portfolios = found;

                addAssetClasses(0);
        });

    }

    function addAssetClasses(portfolioIndex) {

        if (portfolioIndex == userData.portfolios.length) {
            addAccounts(0);
        }

        if (userData.assetclasses == undefined) 
            userData.assetclasses = [];

        let pf = userData.portfolios[portfolioIndex];

        if (pf != undefined && pf.settings != undefined) {

            let mapping = { portfolio_id : pf.symbol, classes : [] };
            let classNames = [];

            pf.settings.selected_assets.forEach(function(sa) { 
                classNames.push(sa.asset_class);
            });

            AssetClass.find({ "classname" : { $in : classNames } },

                function (err, found) {

                    if (err) throw err;

                    mapping.classes = found;
                    userData.assetclasses.push(mapping);
                    addAssetClasses(++portfolioIndex);
            });
        }
    }

    function addAccounts(portfolioIndex) {

        if (portfolioIndex == userData.portfolios.length) {
            addBrokers();
        }

        if (userData.accounts == undefined) 
            userData.accounts = [];

        let pf = userData.portfolios[portfolioIndex];

        if (pf != undefined) {        

            let mapping = {portfolio_id : pf.symbol, accounts : []};

            Account.find({ "account_id" : { $in : pf.accounts } }, 
                
            function(err, found) {
                    
                if (err) throw err;

                mapping.accounts = found;

                userData.accounts.push(mapping);

                addAccounts(++portfolioIndex);
            });
        }      
    }

    function addBrokers() {

        let mappings = [];

        userData.accounts.forEach(function(acc) {

            let mapping = { portfolio_id : acc.portfolio_id, brokers : [] }; 

            acc.accounts.forEach(function(ac) {
                mapping.brokers.push(ac.broker_symbol);
            });

            mappings.push(mapping);
        });

        userData.brokers = mappings;

        addAssets(0, 0);
    }

    function addAssets(portfolioIdx, assetListIdx) {

        if (portfolioIdx == userData.portfolios.length) {
            finish();
        }

        if (userData.assets == undefined) 
            userData.assets = [];

        let pf = userData.portfolios[portfolioIdx];

        if (pf != undefined &&
            pf.settings != undefined &&
            pf.settings.selected_assets != undefined ) {

            if (assetListIdx == pf.settings.selected_assets.length) {
                addAssets(++portfolioIdx, 0);
            }
            else {

                let mapping = { portfolio_id : pf.symbol, 
                                asset_selection : assetListIdx,
                                asset_class : pf.settings.selected_assets[assetListIdx].asset_class,
                                assets : [] }

                let assetNames = [];

                if (pf.settings.selected_assets[assetListIdx].instruments.length > 0)
                    assetNames = pf.settings.selected_assets[assetListIdx].instruments;
                
                if (pf.settings.selected_assets[assetListIdx].underlyings.length > 0)
                    assetNames = pf.settings.selected_assets[assetListIdx].underlyings;


                if (mapping.asset_class === 'Equity') {

                    console.log("looking for equities");

                    Equity.find({ "instrument_id" : { $in : assetNames} },

                        function(err, found) {

                            if (err) throw err;

                            mapping.assets = found;
                            userData.assets.push(mapping);
                            addAssets(portfolioIdx, ++assetListIdx);
                        });
                }

                if (mapping.asset_class === 'Index') {

                    Index.find({ "instrument_id" : { $in : assetNames} },

                        function(err, found) {

                            if (err) throw err;

                            mapping.assets = found;
                            userData.assets.push(mapping);
                            addAssets(portfolioIdx, ++assetListIdx);
                        });
                }

                if (mapping.asset_class === 'Future') {

                    Future.find({ "instrument_id" : { $in : assetNames} },

                        function(err, found) {

                            if (err) throw err;

                            mapping.assets = found;
                            userData.assets.push(mapping);
                            addAssets(portfolioIdx, ++assetListIdx);
                        });
                }

                if (mapping.asset_class === 'Option') {

                    Option.find({ "instrument_id" : { $in : assetNames} },

                        function(err, found) {

                            if (err) throw err;

                            mapping.assets = found;
                            userData.assets.push(mapping);
                            addAssets(portfolioIdx, ++assetListIdx);
                        });
                }             
            }
        }
    }

    function finish() {
        res.status(200).json(userData);
    }
}















module.exports = router;
