const config = require('./config');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override')

// Connect to MongoDB here
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/' + config.mongoDbName, {
  useMongoClient: true,
});

const dbRw = require('./db_io/readAndWrite');
dbRw.clearBlotters();
dbRw.clearExecutions();


//configure app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(
function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}
));

// Initialize routers

const routes = require('./routes');
app.use('/demo', routes.demo);
app.use('/dev', routes.dev);
app.use('/login', routes.login);
app.use('/registry', routes.registry);
app.use('/order', routes.order);
app.use('/book', routes.book);


module.exports = app
