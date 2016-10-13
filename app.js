var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./routes/routes');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

app.use(notFoundMiddleWare);

if(app.get('env') === 'production') {
  app.use(showClientError);
} else {
  app.use(showDevelopmentStackTrace);
}

function showClientError(err, req, res, next) {
  res.status(err.status || 500).json({error: 'Something went wrong.'});
  next(err);
}

function showDevelopmentStackTrace(err, req, res, next) {
  res.status(err.status || 500).json({error: err.message});
  next(err);
}

function notFoundMiddleWare(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

module.exports = app;
