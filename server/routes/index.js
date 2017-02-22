/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 1
  https://circuat.herokuapp.com/

  This file determines the index route
*/
let express = require('express');
let router = express.Router();
let passport = require('passport');
// define user module
let User = require('../db/modules/users').User;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {});
});

/* GET login page. */
router.get('/', (req, res, next) => {
  res.render('login', {});
});


/* GET register page. */
router.get('/register', (req, res, next) => {
  res.render('register', {});
});

/* POST register page. */
router.post('/register', (req, res, next) => {
  u = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName

  });

  User.register(u,
    req.body.password,
    (err) => {
      if (err) { console.log('error adding new user') }

      return passport.authenticate('local')(req, res, () => {
        res.redirect('/');
      })
    });
});

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login', {});
});

router.post('/login', (req, res, next) => {
  res.render('login', {});
});

module.exports = router;
