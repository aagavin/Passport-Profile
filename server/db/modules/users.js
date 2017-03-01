/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://passport-profile.herokuapp.com/


  This file sets up the users Schema
*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');


let UserSchema = Schema(
  {
    username: {
      type: String,
      default: '',
      trim: true,
      required: 'username is required'
    },
    email: {
      type: String,
      default: '',
      trim: true,
      required: 'email is required'
    },
    displayName: {
      type: String,
      default: '',
      trim: true,
      required: 'Display Name is required'
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
    gitHubId:{
      type: Number
    }
  },
  {
    collection: "users"
  });

let options = (
  {missingPasswordError: "Wrong Password"},
  {'loginMessage': "error with login"}
  );

UserSchema.plugin(passportLocalMongoose, options);

exports.User = mongoose.model('User', UserSchema);