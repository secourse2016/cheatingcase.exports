var express     =   require('express');
var app         =   express();
var fs          =   require('fs');
var b = 'CAI';
var path        =   require('path');
var bodyParser  =   require('body-parser');
var jwt         = require('jsonwebtoken');
var db          = require('./db');
var assert      = require('assert');
var codes       =  require('./airports.json');
require('dotenv').load();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
  });
});

app.get('/api/data/airports', function(req, res) {
  res.json( codes );
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

app.get('/db/delete', function(req, res) {
  db.clearDB(function(){
    res.send("deleted succesfully ");
  });
});
app.get('/api/flights/search/:origin/:departingDate/:class', function(req, res) {
        // retrieve params from req.params.{{origin | departingDate | ...}}
       
        var query = {origin :req.params.origin,departureDateTime:req.params.departingDate,class:req.params.class
      };
     

        db.db().collection('flights').find(query).toArray(function(error,f)
          {
            if(error)
      
      
  {
    console.log(error);
    process.exit(1);

  }
  var fr =f;
  var result = { 'outgoingFlights': fr};
          res.send( result);

          });
      
        // return this exact format


});

app.get('/api/flights/search/:origin/:departingDate', function(req, res) {
        // retrieve params from req.params.{{origin | departingDate | ...}}
        var query = {origin :req.params.origin,departureDateTime:req.params.departingDate
      };
      

        db.db().collection('flights').find(query).toArray(function(error,f)
          {
            if(error)
      
      
  {
    console.log(error);
    process.exit(1);

  }
  var fr =f;
  var result = { 'outgoingFlights': fr};
          res.send( result);

          });
      
        // return this exact format


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
