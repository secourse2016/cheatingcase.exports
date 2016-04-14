var assert = require('assert');
var app =   require("./app.js");
var DB  =  require("./db.js");
var env =  require("dotenv");

DB.connect(function(err,db){
assert.equal(null,err);
console.log("connected to DB");
DB.getAirport(function(error){
  DB.seed(function(err,seeded){
    console.log("after Seed");
    try{
      assert.equal(null,err);
      assert.equal(true,seeded);
    }
    catch(err){
      console.log(err);
    }

    app.listen(process.env.PORT, function(){
      console.log("App listening on port 3000 for http connections");
    });
  });
});
});
