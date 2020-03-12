// App: Participants
// FIXING DB CONNECTION [01]
// This version handles automatic loading of json-file when loading.
// Will also try to connect to provided DB
// --Also loads from DB when clicking "Load from DB". 

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const formidable = require('express-formidable');

// File System
var fs = require('fs');

// Mongo
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test').then(() => {
  console.log('DB Connected successfully!')
});

var formiDaBL = require('formidable');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// NODB Commenbt
// Make db accessible to the router
// app.use(function(req,res,next){
//   req.db = db;
//   next();
// });

app.use(formidable({
    uploadDir: path.join(__dirname, 'files'),
    keepExtensions: true
}));

app.use('/', index);
app.use('/users', users);

app.post('users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if(!res.finished){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
