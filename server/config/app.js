let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
<<<<<<< HEAD
=======
let localtrategy = passportlocal.Strategy;
>>>>>>> 6569a9bc24b022a06f6df1da29a05894dbc3f927
let flash = require('connect-flash');

let app = express();
let indexRouter = require('../routes/index');
<<<<<<< HEAD
let TBMRouter = require('../routes/TBM');
=======
let TBMRouter = require('../routes/TBM'); // Updated from WtrackerRouter to TBMRouter
>>>>>>> 6569a9bc24b022a06f6df1da29a05894dbc3f927

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// MongoDB setup
const mongoose = require('mongoose');
let DB = require('./db');
<<<<<<< HEAD
=======
// Point mongoose to the DB URI
>>>>>>> 6569a9bc24b022a06f6df1da29a05894dbc3f927
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');
});

<<<<<<< HEAD
// Middleware
=======
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));
// Setting up flash and passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

>>>>>>> 6569a9bc24b022a06f6df1da29a05894dbc3f927
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

<<<<<<< HEAD
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/tournaments', TBMRouter);
=======
// Define routes
app.use('/', indexRouter); // Home page
app.use('/tournaments', TBMRouter); // Tournaments page
>>>>>>> 6569a9bc24b022a06f6df1da29a05894dbc3f927

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
<<<<<<< HEAD
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
=======
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
>>>>>>> 6569a9bc24b022a06f6df1da29a05894dbc3f927
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
<<<<<<< HEAD
=======



>>>>>>> 6569a9bc24b022a06f6df1da29a05894dbc3f927
