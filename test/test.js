var assert = require('chai').assert;
var request = require('supertest');
 var database = require('../db.js');
var Flights = require('../flights.json');
var Airports = require('../airports.json');
var app =   require("../app.js");
var env =  require("dotenv");
var http = require('http');


   var getdataFromDB = function getdataFromDB(cb) 
 {
  
  database.get('mydata').find({},{},function(err,flightsandairports)
  {
    if (err)
    {
      cb(err,null);
    }
    else
    {
      cb(null,flightsandairports);
    }
  });
 }

before(function(done) {
     // use this after you have completed the connect function
      database.connect(function(err, db) {
        if (err) return done(err);
         else
          done();
      });
 });

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

it('should not seed db again if db is not empty returning false in the callback', function(done) {
       
         database.seed(function(err,seeded)
          {
              assert.equal(seeded, false);
              done();
     });
          });
          

});
 // testing oneWaytrip
describe("oneWayTrip",function(){
   it('should return oneWayTrip specific flight', function(done) {
     request(app).get('/api/flights/search/CAI/JED/1460331360000/economy').expect(200).end(function(err, res) {
        if (err) return done(err);
        var flight=JSON.parse(res.text).outgoingFlights[0];
        assert.deepEqual({"outgoingFlights":[{"flightNumber":flight.flightNumber,"aircraftType":flight.aircraftType,"aircraftModel":flight.aircraftModel,"departureDateTime":flight.departureDateTime,"arrivalDateTime":flight.arrivalDateTime,"origin":flight.origin,"destination":flight.destination,"cost":flight.cost,"currency":flight.currency,"class":flight.class,"Airline":flight.Airline}]}
          ,{"outgoingFlights":[{"flightNumber":"SE9600","aircraftType":"Airbus ","aircraftModel":133,"departureDateTime":1460331360000,"arrivalDateTime":1460339160000,"origin":"CAI","destination":"JED","cost":539,"currency":"USD","class":"economy","Airline":"Singapore Airlines"}]});
        done();
      });
  });
});

//testing twoWayTrip
describe("oneWayTrip",function(){
   it('should return twoWayTrip specific flights', function(done) {
     request(app).get('/api/flights/search/CAI/JED/1460331360000/1460334960000').expect(200).end(function(err, res) {
        if (err) return done(err);
        var flight1=JSON.parse(res.text).outgoingFlights[0];
        var flight2=JSON.parse(res.text).returningFlights[0];
        assert.deepEqual({"outgoingFlights":[{"flightNumber":flight1.flightNumber,"aircraftType":flight1.aircraftType,"aircraftModel":flight1.aircraftModel,"departureDateTime":flight1.departureDateTime,"arrivalDateTime":flight1.arrivalDateTime,"origin":flight1.origin,"destination":flight1.destination,"cost":flight1.cost,"currency":flight1.currency,"class":flight1.class,"Airline":flight1.Airline}],"returningFlights":[{"flightNumber":flight2.flightNumber,"aircraftType":flight2.aircraftType,"aircraftModel":flight2.aircraftModel,"departureDateTime":flight2.departureDateTime,"arrivalDateTime":flight2.arrivalDateTime,"origin":flight2.origin,"destination":flight2.destination,"cost":flight2.cost,"currency":flight2.currency,"class":flight2.class,"Airline":flight2.Airline}]}
          ,{"outgoingFlights":[{"flightNumber":"SE9600","aircraftType":"Airbus ","aircraftModel":133,"departureDateTime":1460331360000,"arrivalDateTime":1460339160000,"origin":"CAI","destination":"JED","cost":539,"currency":"USD","class":"economy","Airline":"Singapore Airlines"}],"returningFlights":[{"flightNumber": "GA5185","aircraftType": "Boeing ","aircraftModel": 438,"departureDateTime": 1460334960000,"arrivalDateTime": 1460342760000,"origin": "JED","destination": "CAI","cost": 837,"currency": "USD","class": "first class","Airline": "Etihad Airways"}]});
        done();
      });
  });
});
