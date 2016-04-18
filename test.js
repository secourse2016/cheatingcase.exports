var assert = require('chai').assert;
 var request = require('supertest');
 var database = require('../db.js');
var Flights = require('../flights.js');
var Airports = require('../airports.js');




//testing seed
 describe('seed', function() {

 	it('should populate the db if db is empty returning true', function(done) {
      database.clearDB(function(){
         database.seed(function(err,seeded){
           assert.equal(seeded,true);
           done();
         });

    });
      });
 	});