const express = require('express');
const passport = require('passport');
const { User } = require('../model/users');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

// Login Post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/tournaments',
  failureRedirect: '/login',
  failureFlash: true
}));

// Register Page
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

// Register Post
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, displayName, email } = req.body;
    const user = new User({ username, displayName, email });
    await User.register(user, password);
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
