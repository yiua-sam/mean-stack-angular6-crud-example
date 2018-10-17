var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var MONGOHOST = process.env.MONGOHOST|| 'localhost';
console.log('The value of MONGOHOST is:', process.env.MONGOHOST);
var CONTEXTROOT = process.env.CONTEXTROOT|| '/bookstore/';
console.log('The value of CONTEXTROOT is:', process.env.CONTEXTROOT);

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+MONGOHOST+'/mean-angular6')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/book');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use(CONTEXTROOT, express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use(CONTEXTROOT+'books', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use(CONTEXTROOT+'book-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use(CONTEXTROOT+'book-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use(CONTEXTROOT+'book-edit/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use(CONTEXTROOT+'api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
