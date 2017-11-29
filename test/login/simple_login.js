'use strict';

var should = require('should');
var request = require('supertest');

var utils =  require('../utils');
var seedDb = require('../seedDb');
var app = require('../../app');

var tdu = require('../testDataUtils');



describe('meta test', function() {

    describe('tdu.user_names', function() {

        it('should list the test users', function(done) {

            let names = ['igor', 'uma', 'marcel', 'robert', 'eljon'];

            (tdu.user_names).should.eql(names);
            done();
        });
    });
});


describe('retrieving user data', function(){ 

//        before(utils.dropDb);
//        before(seed);
//        after(utils.dropDb);
//        after(seed);

    describe('GET /login', function(){

        it('should return empty JSON', function(done){
            request(app)
                .get('/login')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/, 'it should respond with json' )
                .expect(200)
                .end(done)
        });
    });

    describe('GET /login/ [valid username]', function() {

        it('should return json', function(done) {
            request(app)
                .get('/login/' + tdu.user_names[0])
                .set('Accept', 'application/json')
                .expect(200)
                .end(done)
        });
    });

    describe('GET /login/ [invalid username]', function() {

        it('should return 404', function(done) {
            request(app)
                .get('/login/xxxxxxxxzzzzzzz')
                .expect(404)
                .end(done)
        });
    });
});



function seed(done){
  //seed the db
  seedDb.seed(function(err, seedData){
    if (err) return done(err);

    done();
  });
}
