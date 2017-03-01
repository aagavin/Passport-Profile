/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://passport-profile.herokuapp.com/

  This file determines the index route
*/
let express = require('express');
let router = express.Router();
let passport = require('passport');
let flash = require('connect-flash')
// define user module
let User = require('../db/modules/users').User;

// gets the users displayName
let getDisplayName = (req)=>{
  if (req.user){
    return req.user.displayName;
  }
  return undefined;
}

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {displayName: getDisplayName(req)});
});

/* GET register page. */
router.get('/register', (req, res) => {
  res.render('auth/register', {});
});

/* POST register page. */
router.post('/register', (req, res) => {

  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password,
    (err) => {
      if (err) { console.log('error adding new user') }
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/businessList');
      })
    });
});

/* GET login page. */
router.get('/login', (req, res) => {
  if(!req.user){
    res.render('auth/login', {
      messages: req.flash('error')
    });
  }
  else{
    res.render('auth/login',{
      messages: req.flash('error')
    });
  }
  
});

// log the user out
router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/') // redirect to the home page 
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/businessList',
  failureRedirect: '/login',
  failureFlash: true
}));


module.exports = router;
