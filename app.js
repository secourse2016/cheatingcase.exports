var express     =   require('express');
var app         =   express();
var fs          =   require('fs');
var path        =   require('path');
var bodyParser  =   require('body-parser');
var jwt     = require('jsonwebtoken');
var db = require('./db');
var assert = require('assert');
require('dotenv').load();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
      res.send(text);
    });
});

app.get('/db/seed', function(req, res) {
  db.seed(function(err,seeded){
    try{
      assert.equal(null,err);
      assert.equal(true,seeded);
      res.send("Seeded succesfully");
    }
    catch(err){
      res.send("Seeded Unsuccesfully ");
    }
  });
});


// Middleware Function for securing routes using JWT
app.use(function(req, res, next) {

  var jwtToken = req.headers['x-access-token'];
  console.log("Token received !! ", jwtToken);

  var jwtSecret = process.env.JWTSECRET;
  try
  {
    var jwtPayload = jwt.verify(jwtToken, jwtSecret);
    req.payload = payload;
    next();
  }
  catch (err)
  {
    console.error('JWT Error : ', err);
    fs.readFile(__dirname + '/public/Error403.html', 'utf8', function(err, text){
      res.status(403).send(text);
    });
  }

});


module.exports = app
