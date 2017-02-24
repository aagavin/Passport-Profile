/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://***.herokuapp.com/

  This file determines the about route
*/

let express = require('express');
let router = express.Router();

/* */
router.get('/', (req, res, next)=>{
	res.render('businessContactsList',{})
});

module.exports = router