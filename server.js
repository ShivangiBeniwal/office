var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var dcpRouter = require('./routes/dcp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dcp', dcpRouter);

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
