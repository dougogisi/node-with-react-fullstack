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
        maxAge: 30 * 24 * 60 * 60 * 1000, // in milli seconds
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// app.post('/auth/google', (req, res) => {
//   res.send({ hi: 'hi there' });
// });

// app.get('/', (req, res) => {
//   res.send({ hi: 'hi there' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//http://localhost:5000/

//heroku url
//https://stormy-ridge-87260.herokuapp.com/

// Google OAuth URL
//https://accounts.google.com/o/oauth2/v2/auth?
//response_type=code&
//redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&
//scope=profile%20email&
//client_id=880254029072-9pos9me2mntih6nmj4vk3skas1dmggjt.apps.googleusercontent.com
