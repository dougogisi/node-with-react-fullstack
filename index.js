const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParse = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

const app = express();

app.use(bodyParse.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // in milli seconds
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// app.post('/auth/google', (req, res) => {
//   res.send({ hi: 'hi there' });
// });

// app.get('/', (req, res) => {
//   res.send({ hi: 'hi there' });
// });

app.get('/', (req, res) => {
    res.send('testing');
  })

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//http://localhost:5000/
//testing heroku deploy
//heroku url
//https://stormy-ridge-87260.herokuapp.com/

// Google OAuth URL
//https://accounts.google.com/o/oauth2/v2/auth?
//response_type=code&
//redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&
//scope=profile%20email&

//googleClientId= '880254029072-9pos9me2mntih6nmj4vk3skas1dmggjt.apps.googleusercontent.com'
//googleClientSecret= 'MAmJFK7EvWcljmaeeHOfm6rc'
