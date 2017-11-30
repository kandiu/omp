/** @module models/index.js
* Loads all models
*/
'use strict';

const mongoose = require('mongoose');

require('./DBschemas');

module.exports = {
  'User' : mongoose.model('User'),
  'Portfolio' : mongoose.model('Portfolio'),
  'Account' : mongoose.model('Account'),
  'Broker' : mongoose.model('Broker'),
  'Book' : mongoose.model('Book'),
  'Blotter' : mongoose.model('Blotter'),
  'Execution' : mongoose.model('Execution'),
  'Registry' : mongoose.model('Registry'),
  'Registry1' : mongoose.model('Registry1'),
  //'Registry2' : mongoose.model('Registry2'),
  'Future' : mongoose.model('Future'),
  'Equity' : mongoose.model('Equity'),
  'Index' : mongoose.model('Index'),
  'AssetClass' : mongoose.model('AssetClass'),
}

