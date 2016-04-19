require('dotenv').load();

var assert = require('assert');
var app =   require("./app.js");
var DB  =  require("./db.js");



DB.connect(function(err,db){
assert.equal(null,err);
console.log("connected to DB");
DB.clearDB(function(){
  DB.seed(function(err,seeded){
    if(err) console.log("there is error after seed " + err);
    console.log("after Seed");
    app.listen(process.env.PORT, function(){
      console.log("App listening on port "+process.env.PORT+" for http connections");
    });
  });
});

});
