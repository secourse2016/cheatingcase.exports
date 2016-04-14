var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/swissair';
var flightsData = require('./flights.json');
var request = require('request');
var airportsData = null;



var DB = {
  getAirport: function getAirport(cb){
    console.log("inside getAirport");
    request('https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json',
     function (error, response, body) {
    if (!error && response.statusCode == 200) {
    airportsData = body;
    }
    cb(error);
    });
    console.log("inside getAirport 2");
  },

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
    assert.equal(null, err);
    if (count != 0) {
      cb(err, false);
    } else {
      DB.db().collection('flights').insert(flightsData, function(err, result) {
        assert.equal(null, err);
      });
    }
  });

  /* Seeding Airports*/
  DB.db().collection('airports').count(function(err, count) {
    assert.equal(null, err);
    if (count != 0) {
      cb(err, false);
    } else {
      DB.db().collection('airports').insert(airportsData, function(err, result) {
        assert.equal(null, err);
      });
      cb(err, true);
    }
  });
},


db: function db() {
  return _db;
}
};

module.exports = DB;
