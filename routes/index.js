
const demoRouter = require('./demo');
const basicDevRouter = require('./devApi/basic_routes');
const login = require('./login/login');

const equities = require('./equities/equities');
const indeces = require('./indeces/indeces');
const futures = require('./futures/futures');
const options = require('./options/options');

const order = require('./order/order');

module.exports = {
	'demo' : demoRouter,
    'dev' : basicDevRouter,
    'login' : login,
    'equities' : equities,
    'indeces' : indeces,
    'futures' : futures,
    'options' : options,
    'order' : order
}
