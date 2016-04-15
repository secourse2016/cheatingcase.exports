var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/swissair';
var flightsData = require('./flights.json');
var airportsData = require('./airports.json');


var DB = {

  connect: function connect(cb) {
    mongodb.connect(dbUrl, function(err, db) {
      _db = db;
      console.log("connected begin");
      db.createCollection( "flights", { validator: { $and: [
        { flightNumber: { $type: "string" , $exists: true} },
        { aircraftType: { $type: "string" , $exists: true} },
        { aircraftModel: { $type: "int" , $exists: true} },
        { departureDateTime: { $type: "timestamp" , $exists: true} },
        { arrivalDateTime: { $type: "timestamp" , $exists: true} },
        { origin: { $type: "string" , $exists: true} },
        { destination: { $type: "string" , $exists: true} },
        { cost: { $type: "int" , $exists: true} },
        { currency: { $type: "string" , $exists: true} },
        { class: { $type: "string" , $exists: true} },
        { Airline: { $type: "string" , $exists: true} }
      ]
    }
  } );
  console.log("connected end");
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
    _db.collection("flights").remove({}, function(err) {
      assert.equal(null, err);
      _db.collection("airports").remove({}, function(err) {
        assert.equal(null, err);
        _db.collection("bookings").remove({}, function(err) {
          assert.equal(null, err);
          done();
        });
      });
    });
},

db: function db() {
  return _db;
}
};

module.exports = DB;
