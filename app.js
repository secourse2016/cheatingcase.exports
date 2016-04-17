var express     =   require('express');
var app         =   express();
var fs          =   require('fs');
var path        =   require('path');
var bodyParser  =   require('body-parser');
var jwt         =   require('jsonwebtoken');
var db          =   require('./db');
var assert      =   require('assert');
var codes       =   require('./airports.json');



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


app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
  // retrieve params from req.params.{{origin | departingDate | ...}}
  // return this exact format
  var dayInMillis =   24*60*60*1000;
  var queryOutgoing;
  var queryReturn;
  if(req.params.class == 'any') {
    queryOutgoing = { 'origin': req.params.origin,
                      'destination': req.params.destination,
                      'departureDateTime': { $gte: parseInt(req.params.departingDate),
                        $lt: (parseInt(req.params.departingDate) + dayInMillis) } };
    queryReturn = { 'destination': req.params.origin,
                    'origin': req.params.destination,
                    'departureDateTime': { $gte: parseInt(req.params.returningDate),
                      $lt: (parseInt(req.params.returningDate) + dayInMillis) } };
  }
  else {
    queryOutgoing = { 'origin': req.params.origin,
                      'destination': req.params.destination,
                      'class': req.params.class,
                      'departureDateTime':  { $gte: parseInt(req.params.departingDate),
                        $lt: (parseInt(req.params.departingDate) + dayInMillis) } };
    queryReturn = { 'destination': req.params.origin,
                    'origin': req.params.destination,
                    'class': req.params.class,
                    'departureDateTime': { $gte: parseInt(req.params.returningDate),
                      $lt: (parseInt(req.params.returningDate) + dayInMillis) } };
  }

  var outgoingFlights;
  var returnFlights;
  var result;

  db.db().collection('flights').find(queryOutgoing).toArray(function(err,data){
    outgoingFlights = data;
    db.db().collection('flights').find(queryReturn).toArray(function(err,data){
      returnFlights = data;
      result = { "outgoingFlights":  outgoingFlights ,
                 "returnFlights": returnFlights }
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




app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
  // retrieve params from req.params.{{origin | departingDate | ...}}

  var query;
  if(req.params.departingDate == 'any'){
    if(req.params.class == 'any')
      query = { origin:req.params.origin,
                destination:req.params.destination };
    else
      query = { origin:req.params.origin,
                destination:req.params.destination,
                class:req.params.class };
  } else {
    if(req.params.class == 'any')
      query = { origin:req.params.origin,
                destination:req.params.destination,
                departureDateTime: { $gte: req.params.departingDate, $lt: (req.params.departingDate + dayInMillis) } };
    else
      query = { origin: req.params.origin,
                destination: req.params.destination,
                departureDateTime: { $gte: req.params.departingDate, $lt: (req.params.departingDate + dayInMillis) },
                class: req.params.class };
  }



  db.db().collection('flights').find(query).toArray(function(error,flights) {
    if(error) {
      console.log(error);
      process.exit(1);
    }
    var result = { 'outgoingFlights':flights };
    res.send(result);
  });

  // return this exact format
});


module.exports = app
