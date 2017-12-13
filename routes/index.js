
const login = require('./login/login');
const registry = require('./registry/registry');
const blotters = require('./blotters/blotters');
const executions = require('./executions/executions');
const order = require('./order/order');
const book = require('./book/book');

module.exports = {
    'login' : login,
    'order' : order,
    'book' : book,
    'blotters' : blotters,
    'executions' : executions,
    'registry' : registry,
    'order' : order
}
