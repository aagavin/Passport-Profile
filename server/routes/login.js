/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://circuat.herokuapp.com/

  This file determines the login route
*/

let express = require('express');
let router = express.Router();

/* GET login page. */
router.get('/', (req, res, next)=>{
  res.render('login', {  });
});

router.post('/', (req, res, next)=>{
  res.render('login', {  });
});

module.exports = router;
