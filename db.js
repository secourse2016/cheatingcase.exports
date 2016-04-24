var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var myDB = null;
var dbUrl = 'mongodb://'+process.env.DBHOST+':27017/swissair';
var flightsData = require('./flights.json');
var airportsData = require('./airports.json');


var DB = {

  connect: function connect(cb) {
    mongodb.connect(dbUrl, function(err, db) {
      myDB = db;
      console.log("initiating DB connection with " + dbUrl);

//       db.createCollection( "flights", {
//         validator: { $and: [
//           { flightNumber: { $type: 'string' } },
//           { aircraftType: { $type: 'string' } },
//           { aircraftModel: { $type: 'string' } },
//           { departureDateTime: { $type: 'number' } },
//           { arrivalDateTime: { $type: 'number' } },
//           { origin: { $type: 'string' } },
//           { destination: { $type: 'string' } },
//           { cost: { $type: 'string' } },
//           { currency: { $type: 'string' } },
//           { class: { $type: 'string' } },
//           { Airline: { $type: 'string' } }
//         ]
//       }
//     });
//
//     db.createCollection( "airports", {
//       validator: { $and: [
//         {iata: {$type: 'string'} },
//         {iso: {$type: 'string'} },
//         {status: {$type: 'number'}},
//         {continent: {$type: 'string'}} ,
//         {type : {$type:'string'}}
//       ]
//     }
//   });
//
//   db.createCollection( "bookings", {
//     validator: { $and: [
//       {firstName: {$type: 'string'} },
//       {lastName: {$type: 'string'} },
//       {passport: {$type: 'string'}},
//       /*{issueDate: {$type: 'date'}} ,
//       {expiryDate: {$type:'date'}},*/
//       {receipt_number: {$type: 'string'} },
//       {flightNumber: {$type: 'string'} },
//       //{flightDate: {$type: 'number'}},
//       {bookingRefNumber: {$type:'string'}}
//     ]
//   }
// });


console.log("Terminating DB connection Process");
cb(err, db);
});
},

seed: function seed(cb) {
  /* Seeding Flights*/
  DB.db().collection('flights').count(function(err, count) {
    if(err) console.log("error in Flights1");

    if (count != 0) {
      cb(err, false);
    } else {
      DB.db().collection('flights').insert(flightsData, function(err, result) {
        if(err){ console.log("error in Flights2");
        console.log(err);
      }
      /* Seeding Airports*/
      DB.db().collection('airports').count(function(err, count) {
        if(err)
        console.log("error in airports1");

        if (count != 0) {
          cb(err, false);
        } else {
          DB.db().collection('airports').insert(airportsData, function(err, result) {
            if(err) console.log("error in airports2");
          });
          cb(err, true);
        }
      });

    });
  }
});

},

clearDB: function clearDB(done) {
  myDB.collection("flights").remove({}, function(err) {
    assert.equal(null, err);
    myDB.collection("airports").remove({}, function(err) {
      assert.equal(null, err);
        done();
    });
  });
},

db: function db() {
  return myDB;
}
};

module.exports = DB;
