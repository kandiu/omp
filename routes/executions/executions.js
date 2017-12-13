const express = require('express');
const router = express.Router();
const dbRw = require('../../db_io/readAndWrite');

const models = require('../../models');
const Execution = models.Execution;


// GET /

router.get('/', function(req, res) {

    Execution.find({}, function(err, found) {

        if (err || found == null)
            res.status(404).end();
        else {
            res.status(200).json(found);
        }
    });
});

// GET /

router.get('/:uname', function(req, res) {

    let user = req.params.uname;

    dbRw.executionsByUser(user, function(executions) {
        res.status(200).json(executions);
    });
});













module.exports = router;
