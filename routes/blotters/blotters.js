const express = require('express');
const router = express.Router();

const dbRw = require('../../db_io/readAndWrite');



// GET /

router.get('/', function(req, res) {

    dbRw.readBlotters(function(blotters) {
        res.status(200).json(blotters);
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
