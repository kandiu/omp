
const demoRouter = require('./demo');
const basicDevRouter = require('./devApi/basic_routes');
const login = require('./login/login');
const registry = require('./registry/registry');

module.exports = {
	'demo' : demoRouter,
    'dev' : basicDevRouter,
    'login' : login,
    'registry' : registry
}
