const express = require('express');
const router = express.Router();

const dbRw = require('../../db_io/readandWrite');
const models = require('../../models');
const Blotter = models.Blotter;



// GET /

router.get('/', function(req, res) {

    Blotter.find({}, function(err, found) {

        if (err || found == null)
            res.status(404).end();
        else {
            res.status(200).json(found);
        }
    });
});

// GET /:username

router.get('/:uname', function(req, res) {

    let user = req.params.uname;

    dbRw.blottersByUser(user, function(blotters) {

        res.status(200).json(blotters);
    })
});












module.exports = router;
