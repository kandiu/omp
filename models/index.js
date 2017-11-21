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
  'Registry' : mongoose.model('Registry')
}

