var assert = require('chai').assert;
 var request = require('supertest');
 var database = require('../db.js');
var Flights = require('../flights.json');
var Airports = require('../airports.json');


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
           });
           done();
         });
});


 //   it('should have populated the airprts and flights  collection with  document', function(done) {
   

 // getdataFromDB(function(err,data)
 //            {
 //                 assert.equal(,data.length, 'Test Passed');
 //             });
 //         done();
         
 
 //     });
it('should not seed db again if db is not empty returning false in the callback', function(done) {
       
         database.seed(function(err,seeded)
          {
              assert.equal(seeded, false);
          });
          done();
     });
  


 // it('should not seed db again if db is not empty', function(done) {
        
 //         getdataFromDB(function(err,data)
 //         {
 //             assert.equal(102,data.length, 'Test Passed');
 //         });
 //         done();
 //     });


//  it('should clear the database and data size is zero ', function(done) {
        
//          database.clearDB(function(){

//          getdataFromDB(function(err,data)
//          {
//              assert.equal(0,data.length, 'Test Passed');
//          });
//          done();
//      });
// });
});
