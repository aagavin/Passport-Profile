/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://***.herokuapp.com/

  This file determines the about route
*/

let express = require('express');
let mongoose = require('mongoose')
let router = express.Router();
let contacts = require('../db/modules/contactList').ContactList;


let requireAuth = (req, res, next)=>{
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}
/* */
router.get('/', requireAuth, (req, res)=>{

    displayName = req.user.displayName;

    contacts.find().sort({ 'name' : 'ascending'}).exec((err, contactsUsers)=>{

      res.render('businessStuff/businessContactsList',{
        displayName: displayName,
        contacts: contactsUsers
      })
    });

});

/* */
router.get('/:id', requireAuth, (req, res)=>{
  try{
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    contacts.findById(id, (error, contact)=>{
      res.render('businessStuff/businessListEdit',{
        contact: contact
      })
    })
  }
  catch(err){
    console.log(err);
    res.send('error');
  }
});

router.post('/:id', requireAuth, (req, res)=>{
  try{
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    let contact = new contacts({
      _id: id,
      name: req.body.name,
      number: req.body.number,
      email: req.body.email
    });
    contacts.update({_id: id}, contact, (err, contact)=>{
      if(err){
        console.log(err)
        res.send(err)
      }
      res.redirect('/businessList')
    })
  }
  catch(err){
    console.log(err);
    res.send('error');
  }
});

// TODO FIX ADD 
router.get('/add', requireAuth, (req, res)=>{
  
  res.send('sdfsd')
  // res.render('businessStuff/businessListEdit')
});

router.post('/add', requireAuth, (req, res)=>{
  let contact = new contacts({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email
  });

  contacts.create(contact, (err, contact)=>{
    if(err){
      console.log(err)
      res.send(err)
    }
    res.redirect('/businessList')
  })
})


router.get('/delete/:id', requireAuth, (req, res)=>{
  try{
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    contacts.remove({_id: id}, (err)=>{
      if(err){
        console.log(err)
        res.send(err)
      }
      res.redirect('/businessList')
    })
  }
  catch(err){
    console.log(err);
    res.send('error');
  }
})
module.exports = router