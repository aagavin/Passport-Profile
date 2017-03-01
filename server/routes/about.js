/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://passport-profile.herokuapp.com/

  This file determines the about route
*/

let express = require('express');
let router = express.Router();

/* GET about page */
router.get('/', function(req, res, next) {
  res.render('about', {});
});

module.exports = router;
