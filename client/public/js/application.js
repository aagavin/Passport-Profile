/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://passport-profile.herokuapp.com/

  Uses the the typeIt jQuery plugin (http://macarthur.me/typeit/)
  Also sets the class on the sidemenu
*/

$(()=>{
  // sets the class in the sidemenu
  switch (window.location.pathname) {
    case '/':
      $($('ul.sidemenu li')[1]).addClass('active');
      break;
    case '/projects':
      $($('ul.sidemenu li')[2]).addClass('active');
      break;
    case '/services':
      $($('ul.sidemenu li')[3]).addClass('active');
      break;
    case '/contact':
      $($('ul.sidemenu li')[4]).addClass('active');
      break;
    case '/about':
      $($('ul.sidemenu li')[5]).addClass('active');
      break;
    default:
      break;
  }


})