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
 var connectToServer = database.connect(function(err,db){
assert.equal(null,err);
console.log("connected to DB");
database.clearDB(function(){
  database.seed(function(err,seeded){
    if(err) console.log("there is error after seed " + err);
    console.log("after Seed");
    app.listen(process.env.PORT, function(){
      console.log("App listening on port 3000 for http connections");
    });
  });
});

});
 var options = {
  host: 'www.swiss-air.me',
  path: '/api/flights/search/CAI/JED/1460331360000/economy'
};
var result ={"outgoingFlights":[{"_id":"5714f42b5c96c70314f9485f","flightNumber":"SE9600","aircraftType":"Airbus ","aircraftModel":133,"departureDateTime":1460331360000,"arrivalDateTime":1460339160000,"origin":"CAI","destination":"JED","cost":539,"currency":"USD","class":"economy","Airline":"Singapore Airlines"}]};
 var callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
    response.on('end', function () {
    assert.equal(str,result);
    done();
  });
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
