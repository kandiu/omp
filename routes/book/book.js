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



router.get('/op', function(req, res) {

    Book.aggregate([{$group: {_id: "$security_symbol", total: {$sum: "$quantity"}}},
        {$sort: {total: -1}}]
        , function(err, found) {

        if (err || found == null)
            res.status(404).end();
        else {
            res.status(200).json(found);
        }
    });
});















module.exports = router;
