var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var myDB = null;
var dbUrl = 'mongodb://localhost:27017/swissair';
var flightsData = require('./flights.json');
var airportsData = require('./airports.json');


var DB = {

  connect: function connect(cb) {
    mongodb.connect(dbUrl, function(err, db) {
      myDB = db;
      console.log("initiating DB connection");
      /*db.createCollection( "flights", {
         validator: { $and: [
        { flightNumber: { $type: 2 } },
        { aircraftType: { $type: 2 } },
        { aircraftModel: { $type: 'number' } },
        { departureDateTime: { $type: 2 } }, //string for now change to 17 stamp or 9 date later
        { arrivalDateTime: { $type: 2 } }, //string for now change to 17 stamp or 9 date later
        { origin: { $type: 2 } },
        { destination: { $type: 2 } },
        { cost: { $type: 'number' } },
        { currency: { $type: 2 } },
        { class: { $type: 2 } },
        { Airline: { $type: 2 } }
      ]
    }
  });*/

  /*db.createCollection( "airports", {
     validator: { $and: [
       {iata: {$type: 2} },
       {iso: {$type: 2} },
       {status: {$type: 'number'} },
       {name: {$type: 2} },
       {continent: {$type: 2} },
       {continent: {$type: 2} }
  ]
  //care to add smth? WARNING mentioning it here means it is required or val error thrown
  }
});*/

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
        myDB.collection("bookings").remove({}, function(err) {
          assert.equal(null, err);
          done();
        });
      });
    });
},

db: function db() {
  return myDB;
}
};

module.exports = DB;
