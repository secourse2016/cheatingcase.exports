var express     =   require('express');
var app         =   express();
var fs          =   require('fs');
var path        =   require('path');
var bodyParser  =   require('body-parser');
var jwt         =   require('jsonwebtoken');
var db          =   require('./db');
var assert      =   require('assert');

var airlines    =   require('./airlines.json');
var request     =   require('request');


var airlinesIterate = function(index, route, result, res, cb){
  if(index==airlines.length) res.send(result);
  else {
  //  console.log("this is the index now : " + index);
    request({ url: airlines[index].url+''+route, headers: { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'}
  }, function(error, response, body){
      if(!error && response.statusCode == 200 && response.headers['content-type']=='application/json; charset=utf-8'){
       var data = JSON.parse(body);
       var newRes;
       if(result.returnFlights){
         newRes = {
           "outgoingFlights"  : result.outgoingFlights,
           "returnFlights"    : result.returnFlights
         };
       } else {
         newRes = {
           "outgoingFlights"  : result.outgoingFlights
         };
       }
       if(data.outgoingFlights) newRes.outgoingFlights = result.outgoingFlights.concat(data.outgoingFlights);
       if(result.returnFlights && data.returnFlights) newRes.returnFlights = result.returnFlights.concat(data.returnFlights);

       console.log('\nI have queried now '+airlines[index].name+
                   '\n ==> At :: ' +airlines[index].url+
                   '\n Having now data :: \n' +
                   JSON.stringify(newRes, null, '\t'));
       cb(index+1, route, newRes, res, cb);
     } else {
       console.log('\nI have queried now '+airlines[index].name+
                   '\n ==> At :: ' +airlines[index].url+
                   '\n But returned With error continuing with the same data as above \n');
       cb(index+1, route, result, res, cb);
     }
   });
  }
}



require('dotenv').load();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
  });
});

app.get('/api/data/airports', function(req, res) {

  db.db().collection('airports').find({},{'iata':1}).toArray(function(error,airports){
    res.send(airports);
  });
});

app.get('/db/seed', function(req, res) {
  db.seed(function(err,seeded){

    try{
      assert.equal(null,err);
      assert.equal(true,seeded);
      res.send("db is seeded succesfully");
    }
    catch(err){
      res.send("db seeding failed !! ");
    }
  });
});

app.get('/db/delete', function(req, res) {
  db.clearDB(function(){
    db.seed(function(err,seeded){
      res.send("db is deleted but do not worry reseeded again !!");
    });

  });
});


// Middleware Function for securing routes using JWT
app.use(function(req, res, next) {

  var jwtToken = req.body.wt || req.query.wt || req.headers['x-access-token'];
  console.log("Token received !! ", jwtToken);

  var jwtSecret = process.env.JWTSECRET;
  try
  {
    var jwtPayload = jwt.verify(jwtToken, jwtSecret);
    req.payload = jwtPayload;
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

app.get('/db/bookings/:firstName/:lastName/:email/:passport/:issueDate/:expiryDate/:receipt_number/:flightNumber/:flightDate/:bookingRefNumber', function(req, res) {
  var query = { firstName:req.params.firstName,
                lastName:req.params.lastName,
                email:req.params.email,
                passport:req.params.passport,
                issueDate:req.params.issueDate,
                expiryDate:req.params.expiryDate,
                receipt_number:req.params.receipt_number,
                flightNumber:req.params.flightNumber,
                flightDate:req.params.flightDate,
                bookingRefNumber:req.params.bookingRefNumber };
  db.db().collection('bookings').insert(query,function (err) {
    if(err)
    res.send("some data are mistyped or missing");
    else {
      res.send("booking made successfully");
    }

  });

});




app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
  // retrieve params from req.params.{{origin | departingDate | ...}}
  var dayInMillis =   24*60*60*1000;
  var query;
  var oa = req.query.oa;

  query = { origin: req.params.origin,
            destination: req.params.destination,
            departureDateTime: { $gte: parseInt(req.params.departingDate), $lt: (parseInt(req.params.departingDate) + dayInMillis) },
            class: req.params.class };


  db.db().collection('flights').find(query).toArray(function(error,flights) {
    if(error) {
      console.log(error);
      process.exit(1);
    }
    var result = { 'outgoingFlights':flights };
    if(oa!='true'){
      res.send(result);
    } else {
      airlinesIterate(0, '/api/flights/search/'+req.params.origin+'/'+req.params.destination+'/'+req.params.departingDate+'/'+req.params.class+'', result, res, airlinesIterate);
    }
  });

  // return this exact format
});

app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
  // retrieve params from req.params.{{origin | departingDate | ...}}
  // return this exact format
  var dayInMillis = 24*60*60*1000;
  var queryOutgoing;
  var queryReturn;
  var oa = req.query.oa;

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

  var outgoingFlights;
  var returnFlights;
  var result;

  db.db().collection('flights').find(queryOutgoing).toArray(function(err,data){
    outgoingFlights = data;
    db.db().collection('flights').find(queryReturn).toArray(function(err,data){
      returnFlights = data;
      result = { "outgoingFlights": outgoingFlights ,
                 "returnFlights": returnFlights }
      if(oa!='true'){
        res.send(result);
      } else {
        airlinesIterate(0, '/api/flights/search/'+req.params.origin+'/'+req.params.destination+'/'+req.params.departingDate+'/'+req.params.returningDate+'/'+req.params.class+'', result, res, airlinesIterate);
      }

    });
  });
});


module.exports = app
