'use strict';

var should = require('should');
var request = require('supertest');

var utils =  require('../utils');
var seedDb = require('../seedDb');
var app = require('../../app');

var tdu = require('../testDataUtils');

// TODO deeper validation + db check

var sampleOrder;

function initializeSampleOrder() {

    sampleOrder = {
                    "user_id" : "uid",
                  	"side" : "Buy",
	                "ticker" : "test",
	                "quantity" : "test",
	                "type" : "MKT",
	                "duration" : "test",
	                "account" : "test",
                 	"broker" : "test",
	                "portfolio_id" : "24",
                   };
}

function submitOrder(order, expectedStatusCode, done) {

    request(app)
        .post('/order')
        .set('Content-Type', 'application/json')
        .send(order)
        .expect(expectedStatusCode)
        .end(done)
}

function seed(done){

    seedDb.seed(function(err, seedData){
        if (err) return done(err);
        done();
    });
}

describe('submit an order', function(){ 

//        before(utils.dropDb);
//        before(seed);
//        after(utils.dropDb);
//        after(seed);   

    describe('POST /order', function(){

        it('should respond 201 if order is valid', function(done){
            initializeSampleOrder();
            submitOrder(sampleOrder, 201, done);
        });

        it('should respond 400 if fields are missing', function(done){

            initializeSampleOrder();
            delete sampleOrder.broker;
            submitOrder(sampleOrder, 400, done);
        });

        it('should respond 400 if type is LMT and price is missing', function(done){

            initializeSampleOrder();
            sampleOrder.type = "LMT";
            delete sampleOrder.price;
            submitOrder(sampleOrder, 400, done);
        });

        it('should respond 201 if type is LMT and price is given', function(done){

            initializeSampleOrder();
            sampleOrder.type = "LMT";
            sampleOrder.price = "23";
            submitOrder(sampleOrder, 201, done);
        });

        it('should respond 400 if type is neither LMT nor MKT', function(done){

            initializeSampleOrder();
            sampleOrder.type = "XY";
            submitOrder(sampleOrder, 400, done);
        });

        it('should respond 400 if side is neither Buy nor Sell', function(done){
            initializeSampleOrder();
            sampleOrder.side = "XY";
            submitOrder(sampleOrder, 400, done);
        });
    });

});




