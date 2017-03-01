/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://passport-profile.herokuapp.com/

  This file handles all the auth 
*/

let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res)=>{
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;