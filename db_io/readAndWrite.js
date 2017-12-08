const eventBus = require('../pubsub');
const models = require('../models');
const Execution = models.Execution;
const Blotter = models.Blotter;


// BLOTTER

function writeBlotter(blotterObj, next) {

    blotterObj.save(function(err, saved) {
        if (! err) 
            next(saved);       
    });
}

function readBlotter(order_id, next) {

    Blotter.findOne({"order_id" : order_id}, function(err, found) {
        if (! err) {
            next(found);
        }
    });

}

// EXECUTION

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




module.exports = {

    'writeBlotter' : writeBlotter,
    'readBlotter' : readBlotter,
    'writeExecution' : writeExecution, 
    'readExecution' : readExecution,
}
