
const demoRouter = require('./demo');
const basicDevRouter = require('./devApi/basic_routes');

module.exports = {
	'demo' : demoRouter,
    'dev' : basicDevRouter
}
