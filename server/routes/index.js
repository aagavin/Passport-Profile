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
router.get('/', (req, res) => {
  res.render('index', {});
});

/* GET login page. */
router.get('/', (req, res) => {
  res.render('login', {});
});


/* GET register page. */
router.get('/register', (req, res) => {
  res.render('register', {});
});

/* POST register page. */
router.post('/register', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName

  });

  User.register(newUser,
    req.body.password,
    (err) => {
      if (err) { console.log('error adding new user') }

      return passport.authenticate('local')(req, res, () => {
        res.redirect('/');
      })
    });
});

/* GET login page. */
router.get('/login', (req, res) => {
  if(!req.user){

    res.render('login', {
      messages: req.flash('loginMessage')
    });
  }
  else{
    
  }
  
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/projects',
  failureRedirect: '/login',
  failureFlash: 'bad login'
}));


module.exports = router;
