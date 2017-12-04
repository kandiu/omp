
const demoRouter = require('./demo');
const basicDevRouter = require('./devApi/basic_routes');
const login = require('./login/login');

const registry = require('./registry/registry');

const order = require('./order/order');

module.exports = {
	'demo' : demoRouter,
    'dev' : basicDevRouter,
    'login' : login,
    'registry' : registry,
    'order' : order
}
