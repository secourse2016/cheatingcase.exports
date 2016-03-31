var express     =   require('express');
var app         =   express();
var fs          =   require('fs');

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
      res.send(text);
    });
});

app.listen(80, function(){
  console.log("App listening on port 80 for http connections");

});
