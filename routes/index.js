
const demoRouter = require('./demo');
const basicDevRouter = require('./devApi/basic_routes');
const login = require('./login/login');

module.exports = {
	'demo' : demoRouter,
    'dev' : basicDevRouter,
    'login' : login
}
