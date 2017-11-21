'use strict';

var should = require('should');
var request = require('supertest');

var app = require('../app');

describe('Index router', function(){

  describe('GET /', function(){

    it('should return hello world', function(done){
      request(app)
        .get('/demo')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, 'it should respond with json' )
        .expect(200)
        .expect({ 'message' : 'Hello world'})
        .end(done)
    });
  });
});

