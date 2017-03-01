/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://.herokuapp.com/

  This file sets up database information for contact list 
*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');


let ContactSchema = Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Contact name is required'
	},
	number: {
		type: Number,
		required: 'Contact number is required'
	},
	email: {
		type: String,
		default: '',
		required: 'Contact email is required'
	}
	},
	{
		collection: 'contacts'
	}
)

let options = ({
	'missingInfo': 'Not all info entered'
})

ContactSchema.plugin(passportLocalMongoose, options);

exports.ContactList = mongoose.model('ContactSchema', ContactSchema)
