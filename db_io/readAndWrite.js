const eventBus = require('../pubsub');
const models = require('../models');
const Execution = models.Execution;
const Blotter = models.Blotter;


// Execution

function writeExecution(data, next) {

    data.save(function(err, saved) {
        if (! err) 
            next(saved);       
    });
}

function readExecution(order_id, next) {

    Execution.findOne({"order_id" : order_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });
}

// Blotter

function writeBlotter(data, next) {
/*
    data.save(function(err, saved) {
        if (! err) 
            next(saved);       
    });
*/
    next(data);
}

function readBlotter(order_id, next) {

    Blotter.findOne({"order_id" : order_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });

}

module.exports = {

    'writeExecution' : writeExecution, 
    'readExecution' : readExecution,
    'writeBlotter' : writeBlotter,
    'readBlotter' : readBlotter,
}
