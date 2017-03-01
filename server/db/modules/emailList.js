/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://passport-profile.herokuapp.com/

  This file configs the email list Schema

*/

let emailListSchema = require("mongoose").Schema({
	name: String,
	email: String,
	message: String
});


module.exports = emailListSchema;