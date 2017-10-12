//Express
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');

var app = express();
//======================================
//connect to client ====================
//======================================
app.use(express.static('./client'));
app.get('/', function(req, res){
    res.sendFile(__dirname+"/client/index.html")});


app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//======================================
//setup mongodb connection =============
//======================================
var dbURI = 'mongodb://localhost/helpdeskNew';
mongoose.connect(dbURI);
mongoose.connection.once('connected', function(){
    console.log(dbURI + ' Database connected')
});

//======================================
//include all model files using fs modules ===
//======================================
fs.readdirSync('./server/app/models').forEach(function(file){
    //check if file has .js extension
    if(file.indexOf('.js'));
    require('./server/app/models/' + file);
});


//======================================
//include all controllers files using fs modules ===
//======================================
fs.readdirSync('./server/app/controllers').forEach(function(file){
    //check if file has js extension
    if(file.indexOf('.js'));
    var route = require('./server/app/controllers/' + file);
    route.Controller(app);
})

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, "875916b9aa8591781khiladi287df573c07ed56ecc697ebb88b744329af117468be5953");
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

//Passport
app.listen(8080)
