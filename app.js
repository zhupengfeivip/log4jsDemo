var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const log4js = require('log4js');
//加入log4js
log4js.configure(require("./log4js"));
// var jsonConfig = JSON.parse(fs.readFileSync("log4js.json"));
// log4js.configure(jsonConfig);

const loggerOfConsole = log4js.getLogger('console');
console.log = loggerOfConsole.info.bind(loggerOfConsole);
var logger = log4js.getLogger(path.basename(__filename));
logger.debug("debug");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
