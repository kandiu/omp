const express = require('express');
const router = express.Router();

const models = require('../../models');
const Blotter = models.Blotter;


// GET /

router.get('/', function(req, res) {

    let inst = req.params._instrument;

    Blotter.find({}, function(err, found) {

        if (err || found == null) 
            res.status(404).end();           
        else {
            res.status(200).json(found);
        }
    }); 
});













module.exports = router;
