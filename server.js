var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var serveStatic = require('serve-static');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var dcpRouter = require('./routes/dcp');
var navigationRouter = require('./routes/navigation');
var configRouter = require('./routes/configure');
var cowatchRouter = require('./routes/cowatch');
var timerRouter = require('./routes/timer');
var settingsRouter = require('./routes/settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// used if we want to use plain HTML views
// app.use(serveStatic(path.join(__dirname, 'src/views')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dcp', dcpRouter);
app.use('/navigation', navigationRouter);
app.use('/timer', timerRouter);
app.use('/config', configRouter);
app.use('/cowatch', cowatchRouter);
app.use('/settings', settingsRouter);

// Static routes
app.get("/privacypolicy", (req, res) => {
  res.render("privacypolicy");
});

app.get("/termsofuse", (req, res) => {
  res.render("termsofuse");
});

app.get("/perf", (req, res) => {
  res.render("performance", { title: 'Auth Perf Testing' });
});

app.get("/liveTest", (req, res) => {
  res.render("liveTest");
});

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
