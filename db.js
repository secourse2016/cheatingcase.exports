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
      db.createCollection( "flights", {
         validator: { $and: [
        { flightNumber: { $type: 2 , $exists: true} },
        { aircraftType: { $type: 2 , $exists: true} },
        { aircraftModel: { $type: 16 , $exists: true} },
        { departureDateTime: { $type: 17 , $exists: true} },
        { arrivalDateTime: { $type: 17 , $exists: true} },
        { origin: { $type: 2 , $exists: true} },
        { destination: { $type: 2 , $exists: true} },
        { cost: { $type: 16 , $exists: true} },
        { currency: { $type: 2 , $exists: true} },
        { class: { $type: 2 , $exists: true} },
        { Airline: { $type: 2 , $exists: true} }
      ]
    }
  } );
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
        if(err) console.log("error in Flights2");

        /* Seeding Airports*/
        DB.db().collection('airports').count(function(err, count) {
          if(err) console.log("error in airports1");
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
