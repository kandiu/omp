const express = require('express');
const router = express.Router();

const models = require('../../models');
const Book = models.Book;
// GET /

router.get('/', function(req, res) {
    Book.find({}, function(err, found) {
        if (err || found == null)
            res.status(404).end();
        else {
            res.status(200).json(found);
        }
    });
});



// router.get('/openpositions/:user/:portfoglio', function(req, res) {
router.get('/openpositions', function(req, res) {
    // Book.find({user: "$user", portfolio_id: "$portfoglio"}).aggregate([{$group: {_id: "$security_symbol", total: {$sum: "$quantity"}}}
    console.log("OPENPOSITION");
    Book.aggregate([{$group: {_id: "$security_symbol", total: {$sum: "$quantity"}}}
        ]
        , function(err, found) {
        let toRet = [];
        for(let i=0; i<found.length; i++){
            if (found[i].total != "0"){
                //found[i].
                toRet.push(found[i])
            }
        }
        //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",toRet);
        if (err || toRet == null)
            res.status(404).end();
        else {
            res.status(200).json(toRet);
        }
    });
});


// router.get('/openpricepos/:user/:portfoglio/:_id', function(req, res) {
router.get('/openpricepos/:_id', function(req, res) {
    console.log("req.params._id", req.params._id);
    //Book.find({ user: "$user", portfolio_id: "$portfoglio", security_symbol: req.params._id}
    Book.find({security_symbol: req.params._id}
        ,function(err, found) {
            if (err || found == null)
                res.status(404).end();
            else {
            let toret =found.sort({timestamp : 1, price: 1});
                res.status(200).json(toret);
                console.log("found: ",found);
            }
        });
});

// router.get('/openpriceneg/:user/:portfoglio/:_id', function(req, res) {
    router.get('/openpriceneg/:_id', function(req, res) {
    //console.log("req.params._id", req.params._id);
    //Book.find({user: "$user", portfolio_id: "$portfoglio", security_symbol: req.params._id}
        Book.find({security_symbol: req.params._id}
        ,function(err, found) {
            if (err || found == null)
                res.status(404).end();
            else {
                let toret = found.sort({timestamp : 1, price: 1});
                res.status(200).json(toret);
                console.log("found: ",found);
            }
        });
});
















module.exports = router;
