const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require('mongoose');
const keys = require("../config/keys"); 

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});


// Strategy config
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: keys.google.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      var profile = profile._json;
      console.log(profile);
      if(profile.sub) {
        User.findOne({googleId: profile.sub})
        .then((existingUser) => {
          if(existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.sub,
              email: profile.email,
              name: profile.family_name + " " + profile.given_name
            })
            .save()
            .then(user => done(null, user))
          }
        })
      }
    }
  )
);


