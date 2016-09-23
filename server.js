// Packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var sessionConfig = {
 secret:'CookieMonster', // Secret name for decoding secret and such
 resave:false, // Don't resave session if no changes were made
 saveUninitialized: true, // Don't save session if there was nothing initialized
 name:'myCookie', // Sets a custom cookie name
 cookie: {
  secure: false, // This need to be true, but only on HTTPS
  httpOnly:false, // Forces cookies to only be used over http
  maxAge: 3600000
 }
}
var app = express();
// DB Config
require('./server/config/mongoose.js');
// Middle-Ware
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'/client')));
// App routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

// Start App
app.listen(8000, function () {
  console.log("listening on Port 8000");
})