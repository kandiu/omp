
var data = require('./seedData');
/*
var users = data.find(function(d) { return d.name == 'User'; }).data;
var portfolios = data.find(function(d) { return d.name == 'Portfolio'; }).data;
var brokers = data.find(function(d) { return d.name == 'Broker'; }).data;
var accounts = data.find(function(d) { return d.name == 'Account'; }).data;
var registry = data.find(function(d) { return d.name == 'Registry'; }).data;
*/

var users = data.find(d => d.name == 'User').data;
var portfolios = data.find(d => d.name == 'Portfolio').data;
var brokers = data.find(d => d.name == 'Broker').data;
var accounts = data.find(d => d.name == 'Account').data;
// var registry = data.find(d => d.name == 'Registry').data;

var user_names = users.map((d) => d.name);


module.exports = {
    'users' : users,
    'portfolios' : portfolios,
    'brokers' : brokers,
    'accounts' : accounts,
//    'registry' : registry,
    'user_names' : user_names
}
