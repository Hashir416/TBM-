let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localStrategy = passportlocal.Strategy;
let flash = require('connect-flash');

// User Model
const { User } = require('../model/users');

let app = express();
let indexRouter = require('../routes/index');
let TBMRouter = require('../routes/TBM');
let authRouter = require('../routes/auth'); // Authentication routes

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// MongoDB setup
const mongoose = require('mongoose');
let DB = require('./db');
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware setup
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Configure Passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass user data to all views
app.use(function (req, res, next) {
  res.locals.user = req.user || null; // Add user to res.locals
  next();
});

// Define routes
app.use('/', indexRouter);
app.use('/tournaments', TBMRouter);
app.use('/', authRouter); // Use authentication routes

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
