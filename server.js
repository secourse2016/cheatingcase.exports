var express     =   require('express');
var app         =   express();
var fs          =   require('fs');
var path        =   require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
      res.send(text);
    });
});

app.listen(3000, function(){
  console.log("App listening on port 3000 for http connections");

});
