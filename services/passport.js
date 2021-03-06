const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    //we already have a record with that given profile ID
                    done(null, existingUser);
                } else {
                    // we don't already have a record with that given profile ID
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });

        }
    )
);

/*passport.use(
    new FacebookStrategy({
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: '/auth/facebook/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ facebookId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    //we already have a record with that given profile ID
                    done(null, existingUser);
                } else {
                    // we don't already have a record with that given profile ID
                    new User({ facebookId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });

        }
    )
);*/