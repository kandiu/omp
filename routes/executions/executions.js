const express = require('express');
const router = express.Router();
const dbRw = require('../../db_io/readAndWrite');


// GET /

router.get('/', function(req, res) {

    dbRw.readExecutions(function(executions) {
            res.status(200).json(executions);
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
