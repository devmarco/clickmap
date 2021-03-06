var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var db = mongoose.connect('mongodb://localhost/clickmap-dev', {db: {safe: true}});

// Bootstrap models
var modelsPath = path.join(__dirname, './lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});
//POPULATE DB
require('./lib/insert');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'app/public')));

// ROUTES
var home = require('./lib/routes/index');
var dashboard = require('./lib/routes/dashboard');
var API_AccountRoute = require('./lib/routes/API_AccountRoute');


app.use('/', home);
app.use('/dashboard', dashboard);
app.use('/api', API_AccountRoute);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
