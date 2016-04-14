var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/swissair';
var flightsData = require('./flights.json');
var DB = {

    connect: function connect(cb) {
        mongodb.connect(dbUrl, function(err, db) {
            _db = db;
            cb(err, db);
        });
    },

    seed: function seed(cb) {
        DB.db().collection('flights').count(function(err, count) {
            assert.equal(null, err);
            if (count != 0) {
                cb(err, false);
            } else {
                DB.db().collection('flights').insert(flightsData, function(err, result) {
                    assert.equal(null, err);
                });
                cb(err, true);
            }
        })
    },

    db: function db() {
        return _db;
    }
};

module.exports = DB;
