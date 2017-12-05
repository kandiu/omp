
const demoRouter = require('./demo');
const basicDevRouter = require('./devApi/basic_routes');
const login = require('./login/login');

// const equities = require('./equities/equities');
// const indeces = require('./indeces/indeces');
// const futures = require('./futures/futures');
// const options = require('./options/options');
const registry = require('./registry/registry');

const order = require('./order/order');
const book = require('./book/book');

module.exports = {
    'demo' : demoRouter,
    'dev' : basicDevRouter,
    'login' : login,
    // 'equities' : equities,
    // 'indeces' : indeces,
    // 'futures' : futures,
    // 'options' : options,
    'order' : order,
    'book' : book,
    'registry' : registry,
    'order' : order
}
