var express     =   require('express');
var app         =   express();

app.get('/', function(req, res){
  console.log("Request Received");
  res.render('index.html');
});

app.listen(80, function(){
  console.log("App listening on port 80 for http connections");

});
