const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send("Hello from Emaily (soon to be TruSponse Engage!)");
});

app.get('/auth/google/callback', passport.authenticate('google'));

require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Emaily server is live and running...')
});