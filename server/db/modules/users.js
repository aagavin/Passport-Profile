/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://circuat.herokuapp.com/

  This file sets up database information
*/

let Schema = require('mongoose').Schema;
let passportLocalMongoose = require('passport-local-mongoose');


let UserSchema = Schema(
  {
    username: {
      type: string,
      default: '',
      trim: true,
      required: 'username is required'
    },
    email: {
      type: string,
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
    }
  },
  {
    collection: "users"
  });

let options = ({missingPasswordError: "Wrong Password"});

UserSchema.plugin(passportLocalMongoose, options);

exports.User = mongoose.model('User', UserSchema);