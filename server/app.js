/*
  Aaron Fernandes - 300773526 
  COMP 308 - Assignment 2
  https://passport-profile.herokuapp.com/

  The file sets up the express.js
*/

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
// 
// User Configuration
let UserModel = require('./db/modules/users');
let User = UserModel.User; // alias for the User Model - User object
// modules for auth
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let LocalStrategy = passportLocal.Strategy;
let GitHubStrategy = require('passport-github2').Strategy;
let flash = require('connect-flash'); // displays errors / login messages

let index = require('./routes/index');
let about = require('./routes/about');
let contact = require('./routes/contact');
let projects = require('./routes/projects');
let services = require('./routes/services');
let docs = require('./routes/docs');
let businessList = require('./routes/businessContactsList');
let auth = require('./routes/auth');

let app = express();

// set up github auth 
let GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID; //"36fcfda9695aaeb22ffa";
let GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET //"39ec60eb9ef9a60a162672ab492a5b210b622bfc";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, '/../client/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

// setup session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: true,
  resave: true
}));

// initialize passport and flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/about', about);
app.use('/contact', contact);
app.use('/projects', projects);
app.use('/services', services);
app.use('/docs', docs);
app.use('/businessList', businessList);
app.use('/auth', auth);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(User.createStrategy());
let gitHubStrategy = new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done)=>{
    process.nextTick(()=>{
      User.findOne({'gitHubId':profile.id}, (err, user)=>{
        if(err || user == null){
          console.log("No user found\nAdded new user");
          let newGitHubUser = new User({
            username: profile['_json']['login'],
            email: profile['_json']['email']==null ? 'noGitHubEmail@example.com': profile['_json']['email'],
            displayName: profile['_json']['name'],
            gitHubId: profile.id
          });

          User.register(newGitHubUser, profile.id,
          (err)=>{
            if(err) { console.log(err) }
            done(err, newGitHubUser);
          });
        }
        else{
          done(err, user);
        }
      })
    })
  }
);
passport.use(gitHubStrategy);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
