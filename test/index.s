'use strict';

var should = require('should');
var request = require('supertest');

var app = require('../app');

describe('Index router', function(){

  describe('GET /', function(){

    it('should return index.html', function(done){
      request(app)
        .get('/')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/, 'it should respond with html' )
        .expect(200)
        .end(done)
    });
  });
});
