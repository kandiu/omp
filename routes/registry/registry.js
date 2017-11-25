const express = require('express');
const router = express.Router();

const models = require('../../models');
const Registry = models.Registry;

router.get('/', function(req, res){
	res.end("logi api");
})

// GET /:_instrument

router.get('/:_instrument', function(req, res) {

    let inst = req.params._instrument;

    Registry.findOne({"instrument_id" : inst}, function(err, found) {

        if (err || found == null) 
            res.status(404).end();           
        else {
            res.status(200).json(found);
        }
    }); 
});













module.exports = router;
