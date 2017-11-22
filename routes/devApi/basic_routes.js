const express = require('express');
const router = express.Router();

const models = require('../../models');
const User = models.User;
const Portfolio = models.Portfolio;
const Broker = models.Broker;
const Registry = models.Registry;

router.get('/', function(req, res){
	res.end("development api");
})

// USERS

router.get('/users', function(req, res) {

    User.find({}, function(err, found) {

            if (err) 
                res.status(404).end();           
            else
                res.status(200).json(found);
        }); 
});

router.get('/users/:_id', function(req, res) {

    User.findById(req.params._id, function(err, found) {

            if (err) 
                res.status(404).end();           
            else
                res.status(200).json(found);
        }); 
});

// BROKERS

router.get('/brokers', function(req, res) {

    Broker.find({}, function(err, found) {

            if (err) 
                res.status(404).end();           
            else
                res.status(200).json(found);
        }); 
});

router.get('/brokers/:_id', function(req, res) {

    Broker.findById(req.params._id, function(err, found) {

            if (err) 
                res.status(404).end();           
            else
                res.status(200).json(found);
        }); 
});


// PORTFOLIOS

router.get('/portfolios', function(req, res) {

    Portfolio.find({}, function(err, found) {

            if (err) 
                res.status(404).end();           
            else
                res.status(200).json(found);
        }); 
});

router.get('/portfolios/:_id', function(req, res) {

    Portfolio.findById(req.params._id, function(err, found) {

            if (err) 
                res.status(404).end();           
            else
                res.status(200).json(found);
        }); 
});


// REGISTRIES

router.get('/registries', function(req, res) {

    Registry.find({}, function(err, found) {

            if (err) 
                res.status(404).end();           
            else
                res.status(200).json(found);
        }); 
});

router.get('/registries/:_id', function(req, res) {

    Registry.findById(req.params._id, function(err, found) {

            if (err) 
                res.status(404).end();           
            else
                res.status(200).json(found);
        }); 
});










































module.exports = router;
