var assert = require('assert');
var app =   require("./app.js");
var DB  =  require("./db.js");

DB.connect(function(err,db){
assert.equal(null,err);
DB.seed(function(err,seeded){
  assert.equal(null,err);
  assert.equal(true,seeded);

  app.listen(3000, function(){
    console.log("App listening on port 3000 for http connections");
  });
})
});
