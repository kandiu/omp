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
  'Exchange' : mongoose.model('Exchange'),
  'Book' : mongoose.model('Book'),
  'Blotter' : mongoose.model('Blotter'),
  'Execution' : mongoose.model('Execution'),
  'Registry' : mongoose.model('Registry'),
  'Future' : mongoose.model('Future'),
  'Option' : mongoose.model('Option'),
  'Equity' : mongoose.model('Equity'),
  'Index' : mongoose.model('Index'),
  'AssetClass' : mongoose.model('AssetClass'),
  'FillOrCancel' : mongoose.model('FillOrCancel')
}

