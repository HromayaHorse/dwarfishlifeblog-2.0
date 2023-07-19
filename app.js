var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const experssLayouts = require('express-ejs-layouts')

var indexRouter = require('./routes/index');
let linksRouter = require('./routes/links');
let newsRouter = require('./routes/news');
let artRouter = require('./routes/art')

const db = require('./db/queries')

// call express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// determine new folder for my layouts
app.set('layout', './layouts/application')

// add express layouts module
app.use(expressLayouts)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/news', db.getNews)
app.get('/api/news/:id', db.getNewsById)

app.use('/', indexRouter);
app.use('/links', linksRouter);
app.use('/news', newsRouter);
app.use('/art', artRouter);

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
