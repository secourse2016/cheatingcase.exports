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

var ObjectID = require('mongodb').ObjectID;

var stripe  = require('stripe')(process.env.STRIPESECRETKEY);
var teams   = require('./teams.json');
var randomstring = require("randomstring");

var generateRefNum = function(){
  var r = "SA" + randomstring.generate({ length:5, charset: 'alphanumeric', readable: true, capitalization: 'uppercase'});
  db.db().collection('bookings').find({'refNum': r}).toArray(function (err, data){
    if(data.length==0) return r;
    else return generateRefNum();
  });
}

var generateSeats = function(seats, seatsNum, Class, n, refNum){
  if(seatsNum==0) return seats;
  else {
    for(var i = (Class=="business")?(1):(n/8); i<(Class=="business")?(n/8):(n/4); i++){
      if(!containsSeat(seats, (""+i+"A"))){
        seats.push({ "seatNum": (""+i+"A"), "refNum": refNum });
        break;
      } else if(!containsSeat(seats, (""+i+"B"))){
        seats.push({ "seatNum": (""+i+"B"), "refNum": refNum });
        break;
      } else if(!containsSeat(seats, (""+i+"K"))){
        seats.push({ "seatNum": (""+i+"K"), "refNum": refNum });
        break;
      } else if(!containsSeat(seats, (""+i+"H"))){
        seats.push({ "seatNum": (""+i+"H"), "refNum": refNum });
        break;
      }
    }
    return generateSeats(seats, seatsNum-1, Class, n, refNum);
  }
}

var containsSeat = function(seats, seatNum){
  for(var i = 0; i<seats.length; i++){
    if(seats[i].seatNum === seatNum) return true;
  }
  return false;
}

var filterSeats = function(seats, refNum){
  var filteredSeats = [];
  for(var i=0; i<seats.length; i++){
    if(seats[i].refNum === refNum) filteredSeats.push(seats[i]);
  }
  return filteredSeats;
}

var airlinesIterate = function(index, route, result, res, cb){
  if(index==airlines.length) res.send(result);
  else {
    request({ url: airlines[index].url+''+route, timeout:parseInt(process.env.TIMEOUT), headers: { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'}
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
       if(data.outgoingFlights  && data.outgoingFlights.length>0 && data.outgoingFlights[0]._id) newRes.outgoingFlights = result.outgoingFlights.concat(data.outgoingFlights);
       if(result.returnFlights && data.returnFlights && data.returnFlights.length>0 && data.returnFlights[0]._id) newRes.returnFlights = result.returnFlights.concat(data.returnFlights);

       console.log('\nI have queried now '+airlines[index].name+
                   '\n ==> At :: ' +airlines[index].url+
                   '\n Having now data :: \n' +
                   JSON.stringify(newRes, null, '\t'));
       cb(index+1, route, newRes, res, cb);
     } else {
       console.log('\nI have queried now '+airlines[index].name+
                   '\n ==> At :: ' +airlines[index].url+
                   '\n But returned With error thus continuing with the same data as above \n');
       cb(index+1, route, result, res, cb);
     }
   });
  }
}



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  var dataLog = {
    'ipAddress': req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress,
    'URL': req.url,
    'Host': req.headers['host'],
    'Connection': req.headers['connection'],
    'User-Agent': req.headers['user-agent'],
    'DateTime': new Date()
  }
  fs.appendFile('.log', JSON.stringify(dataLog, null, '\t'));
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
  if(req.query.pass===process.env.DELETEPASS){
    db.clearDB(function(){
      db.seed(function(err,seeded){
        res.send({ "message": "AUTHORIZED: DB is deleted but do not worry reseeded again !!"});
      });
    });
  } else {
    res.send({ "message": "UNAUTHORIZED: It's Unethical to play with people's databases !!" });
  }

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

// NOTE: non-seat version of oneway search route
app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
  // retrieve params from req.params.{{origin | departingDate | ...}}
  var dayInMillis =   24*60*60*1000;
  var query;
  var oa = req.query.oa;
  var seats = 1;
  var Class = req.params.class;

  var economyComparator = (Class==="economy")?(seats):(0);
  var businessComparator = (Class==="business")?(seats):(0);

  query = { 'origin': req.params.origin,
            'destination': req.params.destination,
            'departureDateTime': { $gte: parseInt(req.params.departingDate), $lt: (parseInt(req.params.departingDate) + dayInMillis) },
            'class': req.params.class,
            'emptyEconomy': { $gte: economyComparator },
            'emptyBusiness': { $gte: businessComparator }
          };


  console.log(JSON.stringify(query));

  db.db().collection('flights').find(query,{ capacity:0 , emptyEconomy:0 ,emptyBusiness:0,seats:0 }).toArray(function(error,flights) {
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

});


// NOTE: non-seated roundtrip version of search route
app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
  // retrieve params from req.params.{{origin | departingDate | ...}}
  // return this exact format
  var dayInMillis = 24*60*60*1000;
  var queryOutgoing;
  var queryReturn;
  var oa = req.query.oa;

  var seats = 1;
  var Class = req.params.class;

  var economyComparator = (Class==="economy")?(seats):(0);
  var businessComparator = (Class==="business")?(seats):(0);

  queryOutgoing = { 'origin': req.params.origin,
                    'destination': req.params.destination,
                    'class': req.params.class,
                    'departureDateTime':  { $gte: parseInt(req.params.departingDate),
                      $lt: (parseInt(req.params.departingDate) + dayInMillis) },
                    'emptyEconomy': { $gte: parseInt(economyComparator) },
                    'emptyBusiness': { $gte: parseInt(businessComparator) }
                  };


  queryReturn = { 'destination': req.params.origin,
                  'origin': req.params.destination,
                  'class': req.params.class,
                  'departureDateTime': { $gte: parseInt(req.params.returningDate),
                    $lt: (parseInt(req.params.returningDate) + dayInMillis) },
                  'emptyEconomy': { $gte: parseInt(economyComparator) },
                  'emptyBusiness': { $gte: parseInt(businessComparator) }
                };

  var outgoingFlights;
  var returnFlights;
  var result;

  db.db().collection('flights').find(queryOutgoing,{ capacity:0 , emptyEconomy:0 ,emptyBusiness:0,seats:0 }).toArray(function(err,data){
    outgoingFlights = data;
    db.db().collection('flights').find(queryReturn,{ capacity:0 , emptyEconomy:0 ,emptyBusiness:0,seats:0 }).toArray(function(err,data){
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

app.post('/booking', function (req, res){

  var stripeToken = req.body.paymentToken;
  var cost  = req.body.cost;

  stripe.charges.create({
      amount: cost,
      currency: "usd",
      source: stripeToken,
      description: "testPayment"
    }, function(err, data) {
    if (err) res.send({ refNum: null, errorMessage: err });
    else
      var bookingRefNum = generateRefNum();
      var seatsNo = req.body.passengerDetails.length;

      var booking = {
        'passengerDetails': req.body.passengerDetails,
        'class'           : req.body.class,
        'cost'            : req.body.cost,
        'outgoingFlightId': req.body.outgoingFlightId,
        'returnFlightId'  : req.body.returnFlightId,
        'refNum'          : bookingRefNum
      };

      db.db().collection('bookings').insert(booking, function (err, doc){
        if(err) res.send({ "refNum": null, "errorMessage": err });
        else {
          db.db().collection('flights').findOne({'_id': booking.outgoingFlightId}, function (flight, err){
            if(err) { res.send({ "refNum": null, "errorMessage": err }); return; }
            var newSeats = generateSeats(flight.seats, seatsNo, flight.class, flight.capacity, bookingRefNum);
            var newEmptyEconomy = parseInt(flight.emptyEconomy) - (flight.class==="economy")?(seatsNo):(0);
            var newEmptyBusiness = parseInt(flight.emptyBusiness) - (flight.class==="business")?(seatsNo):(0);
            db.db().collection('flights')
              .update({'_id': booking.outgoingFlightId}, { $set:{ 'seats': newSeats,
              'emptyEconomy': newEmptyEconomy, 'emptyBusiness': newEmptyBusiness }}, function (error, results){
                if(err) { res.send({ "refNum": null, "errorMessage": err }); return; }
                if(booking.returnFlightId && booking.returnFlightId != null){
                  db.db().collection('flights').findOne({'_id': booking.returnFlightId }, function (flightReturn, err){
                    if(err) { res.send({ "refNum": null, "errorMessage": err }); return; }
                    var newSeatsRet = generateSeats(flightReturn.seats, seatsNo, flightReturn.class, flightReturn.capacity, bookingRefNum);
                    var newEmptyEconomyRet = parseInt(flightReturn.emptyEconomy) - (flightReturn.class==="economy")?(seatsNo):(0);
                    var newEmptyBusinessRet = parseInt(flightReturn.emptyBusiness) - (flightReturn.class==="business")?(seatsNo):(0);
                    db.db().collection('flights')
                      .update({'_id': booking.returnFlightId}, { $set:{ 'seats': newSeatsRet,
                      'emptyEconomy': newEmptyEconomyRet, 'emptyBusiness': newEmptyBusinessRet }}, function (errorRet, resultsRet){
                        if(err) { res.send({ "refNum": null, "errorMessage": err }); return; }
                        else res.send({ "refNum": bookingRefNum, "errorMessage": null });
                      });
                  });
                } else {
                  res.send({ "refNum": bookingRefNum, "errorMessage": null });
                }
              });
          });
        }
      });
    });
});

app.get('/viewbooking/:refNum', function (req, res){
  var refNum = parseInt(req.params.refNum);

  db.db().collection('bookings').findOne({ 'refNum': refNum }, function (err, booking){
    var bookingData = booking;
    db.db().collection('flights').findOne({ '_id': new ObjectID(bookingData.outgoingFlightId) }, function (err, flight){

      var outgoingSeats = filterSeats(JSON.parse(flight.seats), refNum);
      bookingData.outgoingSeats = outgoingSeats;
      if(bookingData.returnFlightId && bookingData.returnFlightId != null){
        db.db().collection('flights').findOne({ '_id': new ObjectID(bookingData.returnFlightId)}, function (err, flightRet){
          var returnSeats = filterSeats(JSON.parse(flightRet.seats), refNum);
          bookingData.returnSeats = returnSeats;
          res.send(bookingData);
        });
      } else {
        res.send(bookingData);
      }
    });
  });

});

app.post('/bookingOthers', function (req, res){
  var airLine = req.query.airline;

  request({ 'url': teams[airLine]+'/booking',
            'method': "POST",
            'json': true,   // <--Very important!!!
            'body': req.body,
            'timeout': parseInt(process.env.TIMEOUT),
            'headers': { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'}
          }, function (error, response, body){
            if(err) res.send({ "response": { "refNum": null, "errorMessage": err }, "airlineURL": null });
            else {
              res.send({ "response":response, "airlineURL": teams[airLine] });
            }
          });
});

// NOTE: seated version of oneway search route
app.get('/api/flights/search/:origin/:destination/:departingDate/:class/:seats', function(req, res) {
  // retrieve params from req.params.{{origin | departingDate | ...}}
  var dayInMillis =   24*60*60*1000;
  var query;
  var oa = req.query.oa;
  var seats = parseInt(req.params.seats);
  var Class = req.params.class;

  var economyComparator = (Class==="economy")?(seats):(0);
  var businessComparator = (Class==="business")?(seats):(0);

  query = { 'origin': req.params.origin,
            'destination': req.params.destination,
            'departureDateTime': { $gte: parseInt(req.params.departingDate), $lt: (parseInt(req.params.departingDate) + dayInMillis) },
            'class': req.params.class,
            'emptyEconomy': { $gte: economyComparator },
            'emptyBusiness': { $gte: businessComparator }
          };


  db.db().collection('flights').find(query,{ capacity:0 , emptyEconomy:0 ,emptyBusiness:0,seats:0 }).toArray(function(error,flights) {
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

});

// NOTE: seated roundtrip version of search route
app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res) {
  // retrieve params from req.params.{{origin | departingDate | ...}}
  // return this exact format
  var dayInMillis = 24*60*60*1000;
  var queryOutgoing;
  var queryReturn;
  var oa = req.query.oa;
  var seats = parseInt(req.params.seats);
  var Class = req.params.class;

  var economyComparator = (Class==="economy")?(seats):(0);
  var businessComparator = (Class==="business")?(seats):(0);

  queryOutgoing = { 'origin': req.params.origin,
                    'destination': req.params.destination,
                    'class': req.params.class,
                    'departureDateTime':  { $gte: parseInt(req.params.departingDate),
                      $lt: (parseInt(req.params.departingDate) + dayInMillis) },
                    'emptyEconomy': { $gte: economyComparator },
                    'emptyBusiness': { $gte: businessComparator }
                  };
  queryReturn = { 'destination': req.params.origin,
                  'origin': req.params.destination,
                  'class': req.params.class,
                  'departureDateTime': { $gte: parseInt(req.params.returningDate),
                    $lt: (parseInt(req.params.returningDate) + dayInMillis) } ,
                  'emptyEconomy': { $gte: economyComparator },
                  'emptyBusiness': { $gte: businessComparator }
                };

  var outgoingFlights;
  var returnFlights;
  var result;

  db.db().collection('flights').find(queryOutgoing,{ capacity:0 , emptyEconomy:0 ,emptyBusiness:0,seats:0 }).toArray(function(err,data){
    outgoingFlights = data;
    db.db().collection('flights').find(queryReturn,{ capacity:0 , emptyEconomy:0 ,emptyBusiness:0,seats:0 }).toArray(function(err,data){
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
