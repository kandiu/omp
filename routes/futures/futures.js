const express = require('express');
const router = express.Router();

const models = require('../../models');
const Future = models.Future;

router.get('/', function(req, res){
	res.end("usage: method GET, url /instrument_id");
})

// GET /:_instrument

router.get('/:_instrument', function(req, res) {

    let inst = req.params._instrument;

    Future.findOne({"instrument_id" : inst}, function(err, found) {

        if (err || found == null) 
            res.status(404).end();           
        else {
            res.status(200).json(found);
        }
    }); 
});













module.exports = router;
