var express     =   require('express');
var app         =   express();
var fs          =   require('fs');
var path        =   require('path');
var bodyParser  =   require('body-parser');
var jwt         = require('jsonwebtoken');
var db          = require('./db');
var assert      = require('assert');
var codes       =  require('./airports.json');

var outgoingFlights=null;
var returnFlights=null;
var result=null;

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
    // if(err && (!seeded))
    //   res.send("Seeding Failed");
    // else
    //   res.send("Seeded succesfully");
    try{
      assert.equal(null,err);
      assert.equal(true,seeded);
      res.send("Seeded succesfully");
    }
    catch(err){
      res.send("Seeding Failed");
    }
  });
});


app.get('/db/delete',function(req, res) {
  db.clearDB(function(){
    res.send("deleted succesfully ");
  });
});

app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
        // retrieve params from req.params.{{origin | departingDate | ...}}
        // return this exact format 
        
    db.db().collection('flights').find({'origin':req.params.origin ,'destination':req.params.destination,'class':req.params.class ,'departureDateTime':req.params.departingDate}).toArray(function(err,data){
            outgoingFlights=data;
    db.db().collection('flights').find({'destination':req.params.origin , 'origin':req.params.destination, 'class':req.params.class,'departureDateTime':req.params.returningDate}).toArray(function(err,data){
            returnFlights=data;
            result = {"outgoingFlights":  outgoingFlights 
                        ,
                        "returnFlights": returnFlights
                                  }
                                  res.send(result);
           });
           }); 
               
    });
app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate', function(req, res) {
      // retrieve params from req.params.{{origin | departingDate | ...}}
      // return this exact format 
      
  db.db().collection('flights').find({'origin':req.params.origin ,'destination':req.params.destination,'departureDateTime':req.params.departingDate}).toArray(function(err,data){
          outgoingFlights=data;
  db.db().collection('flights').find({'destination':req.params.origin , 'origin':req.params.destination,'departureDateTime':req.params.returningDate}).toArray(function(err,data){
          returnFlights=data;
          result = {"outgoingFlights":  outgoingFlights 
                      ,
                      "returnFlights": returnFlights
                                }
                                res.send(result);
         });
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
