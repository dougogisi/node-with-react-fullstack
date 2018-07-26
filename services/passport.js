const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    });
});

// app: doug-emaily-dev
// clientID 880254029072-9pos9me2mntih6nmj4vk3skas1dmggjt.apps.googleusercontent.com
// clientSecret MAmJFK7EvWcljmaeeHOfm6rc
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            // we already have a record with the given profile id
            done(null, existingUser);
          } else {
            // we don't have a user record with the ID, make a new record
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user))
          }
        })
    }
  )
);
