// Node.js Dependencies
const express = require("express");
const app = express();
const http = require("http");
const io = require("socket.io")(http);
const path = require("path");
var session = require("express-session");
const MongoStore = require("connect-mongo/es5")(session);

var mongoose = require("mongoose");
var passport = require("passport");
var handlebars = require("express-handlebars");

console.log("LOOP THRU1");

var parser = {
    body: require("body-parser")
};

require("dotenv").load();

app.use(passport.initialize());
console.log("LOOP THRU2");


var models = require("./models");
var db = mongoose.connection;

var router = {
	index: require("./routes/index")
 };

var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "1580647242250169";
var FACEBOOK_APP_SECRET = "b85c97639e0c504bf42e450456f894b6";

// Database Connection
var db = mongoose.connection;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
    console.log("LOOP THRU3");
});

var SESSION_SECRET = '**Random string**' ;
// session middleware
var session_middleware = session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: db })
});

app.use(passport.session());
console.log("LOOP THRU4");

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine('html', handlebars({ defaultLayout: 'layout', extname: '.html' }));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.cookie());
app.use(parser.body.urlencoded({ extended: true }));
app.use(parser.body.json());

app.use(session({
   secret: 'keyboard cat',
   saveUninitialized: true,
   resave: true
}));

app.use(require('method-override')());
app.use(session_middleware);
/* TODO: Passport Middleware Here*/

 
/* TODO: Use Facebook Strategy for Passport here */
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));
console.log("LOOP THRU8");

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

/* TODO: Passport serialization here */
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Routes
/* TODO: Routes for OAuth using Passport */
app.get("/", router.index.view);
// POST method route
//app.post("/message", router.email.send);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//More routes here if needed

io.use(function(socket, next) {
    session_middleware(socket.request, {}, next);
});

/* TODO: Server-side Socket.io here */

// Start Server
http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
