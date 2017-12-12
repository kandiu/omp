const express = require('express');
const router = express.Router();
const dbRw = require('../../db_io/readAndWrite');

router.get('/', function(req, res){
	res.status(200).json({});
})

// GET /:_username


router.get('/:_username', function(req, res) {

    let uname = req.params._username;
    let userData = {};

    dbRw.readUser(uname, function(found) {
        if (found) {
            sendUserData(found, res); 
        }
        else {
            res.status(404).end();  
        }   
    }); 
});



function sendUserData(userObject, res) {

    let userData = {user : userObject, accounts: []};

    addPortfolios();

    function addPortfolios() {

        dbRw.portfolioList(userObject.portfolios, function(pfs) {
            userData.portfolios = pfs;
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

            dbRw.assetClassList(classNames, function(found) {

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

            dbRw.accountList(pf.accounts, function(found) { 

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

        finish();
    }

    function finish() {
        res.status(200).json(userData);
    }
}















module.exports = router;
