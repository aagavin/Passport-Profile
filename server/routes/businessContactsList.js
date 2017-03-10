/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://passport-profile.herokuapp.com/

  This file determines the business route
*/


let express = require('express');
let mongoose = require('mongoose')
let router = express.Router();
let contacts = require('../db/modules/contactList').ContactList;

/**
 * forces a user to be login
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 * @returns {undefined}
 */
let requireAuth = (req, res, next) => {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}


/*
  Shows the business contact list
*/
router.get('/', requireAuth, (req, res) => {

  displayName = req.user.displayName;

  contacts.find().sort({ 'name': 'ascending' }).exec((err, contactsUsers) => {

    res.render('businessStuff/businessContactsList', {
      displayName: displayName,
      contacts: contactsUsers
    })
  });

});

/*
  Edit a specific contact
*/
router.get('/:id', requireAuth, (req, res) => {
  try {
    if (req.params.id == 'add') {
      res.render('businessStuff/businessListEdit', { contact: undefined });
      res.end();
      return;
    }
    else {
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
      console.log('**********')
      contacts.findById(id, (error, contact) => {
        res.render('businessStuff/businessListEdit', {
          contact: contact
        })
      })
    }
  }
  catch (err) {
    console.log(err);
  }
});

/*
  Updates a specific contact or add a new one
*/
router.post('/:id', requireAuth, (req, res) => {
  try {
    if (req.params.id == 'add') {
      let contact = new contacts({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
      });

      contacts.create(contact, (err, contact) => {
        if (err) {
          console.log(err)
          res.send(err)
        }
        res.redirect('/businessList')
      })
    }
    else {
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
      let contact = new contacts({
        _id: id,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
      });
      contacts.update({ _id: id }, contact, (err, contact) => {
        if (err) {
          console.log(err)
          res.send(err)
        }
        res.redirect('/businessList')
      })
    }
  }
  catch (err) {
    console.log(err);
  }
});

/*
  Remove a contact by id
*/
router.get('/delete/:id', requireAuth, (req, res) => {
  try {
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    contacts.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err)
        res.send(err)
      }
      res.redirect('/businessList')
    })
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
})
module.exports = router