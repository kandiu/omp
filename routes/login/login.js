const express = require('express');
const router = express.Router();

const models = require('../../models');
const User = models.User;
const Portfolio = models.Portfolio;
const Broker = models.Broker;
const Registry = models.Registry;
const Account = models.Account;

router.get('/', function(req, res){
	res.end("logi api");
})

// GET /:_username

/*

returns a json object containing the following fields:

- user : User instance as stored in the db
- portfolios : array of Portfolio instances related to the user ## for populating the portfolios drop-down ##
- assetClasses : array of mappings { portfolio_id : array of asset_class } ## for populating the asset class drop-down ##
- accounts : array of mappings { portfolio_id : array of accounts } 
- brokers : array of mappings { portfolio_id : array of brokers } ## for populating the broker class drop-down ##

*/

router.get('/:_username', function(req, res) {

    let uname = req.params._username;
    let userData = {};

    User.findOne({'name' : uname}, function(err, found) {

        if (err) 
            res.status(404).end();           
        else {
            sendUserData(found, res);
        }
    }); 
});



function sendUserData(userObject, res) {

    let userData = {user : userObject};

    addPortfolios();

    function addPortfolios() {

        Portfolio.find({ "portfolio_id" : { $in : userObject.portfolios } }, 
            
            function(err, found) {
                
                if (err) throw err;

                userData.portfolios = found;
                addAssetClasses();
        });

    }

    function addAssetClasses() {

        let mappings = [];        

        userData.portfolios.forEach(function(pf) {

            let mapping = {portfolio_id : pf.portfolio_id, assetclasses : []};
            let classes = [];

            if (pf.settings != undefined && pf.settings.selected_assets.length > 0) {

                pf.settings.selected_assets.forEach(function(sa) {
                    mapping.assetclasses.push(sa.asset_class);
                });
            }

            else {
                mapping.ascl = ['Equity', 'Future', 'Option'];
            }

            mappings.push(mapping);
        });

        userData.assetClasses = mappings;

        addAccounts(0);
    }


    function addAccounts(portfolioIndex) {

        if (portfolioIndex == userData.portfolios.length) {
            addBrokers();
        }

        if (userData.accounts == undefined)
            userData.accounts = [];

        let pf = userData.portfolios[portfolioIndex];

        if (pf != undefined) {        

            let mapping = {portfolio_id : "", accounts : []};

            Account.find({ "account_id" : { $in : pf.accounts } }, 
                
            function(err, found) {
                    
                if (err) throw err;

                mapping.pfId = pf.portfolio_id;
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
                mapping.brokers.push(ac.broker_id);
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
