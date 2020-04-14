// Required dependencies
const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require('./config/keys');
const mongoose = require('mongoose'); 


mongoose.connect(keys.mongoURI, {useNewUrlParser: true});
require('./models/user');
require('./services/passport');


//Cookie session config
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ["randomstringhere"],
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// passport.authenticate middleware is used here to authenticate the request
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Used to specify the required data
  })
);

// The middleware receives the data from Google and runs the function on Strategy config
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/secret");
  }
);

// Secret route
app.get("/secret", isUserAuthenticated, (req, res) => {
  res.send("You have reached the secret route");
});

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});


// Logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send("You must login!");
  }
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
