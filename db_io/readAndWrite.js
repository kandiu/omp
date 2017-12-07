const eventBus = require('../pubsub');
const models = require('../models');
const FillOrCancel = models.FillOrCancel;
const Blotter = models.Blotter;


// FillOrCancel

function writeFillOrCancel(data, next) {

    data.save(function(err, saved) {
        if (! err) 
            next(saved);       
    });
}

function readFillOrCancel(order_id, next) {

    FillOrCancel.findOne({"order_id" : order_id}, function(err, found) {
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

    'writeFillOrCancel' : writeFillOrCancel, 
    'readFillOrCancel' : readFillOrCancel,
    'writeBlotter' : writeBlotter,
    'readBlotter' : readBlotter,
}
