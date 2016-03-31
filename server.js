var express     =   require('express');
var app         =   express();

app.get('/', function(req, res){
  console.log("Request Received");
  res.send("<html><head><title>Swiss Air</title></head><body><p align=\"center\"><h1>SwissAir Website Under Construction </h1><br><h5>cheatingCase.exports | All Copyrights reserved 2016</h5></p></body></html>");
});

app.listen(80, function(){
  console.log("App listening on port 80 for http connections");

});
