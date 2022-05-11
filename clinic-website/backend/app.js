var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let mongoose = require('mongoose')
var logger = require('morgan');


mongoose.connect('mongodb://localhost:27017/setiprj', {})
  .catch(error => console.log(error));
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let Psychologist = require('./routes/Psychologist')
app.use('/Psychologist', Psychologist)

let worhshop = require('./routes/worhshop')
app.use('/worhshop', worhshop)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  next()
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
