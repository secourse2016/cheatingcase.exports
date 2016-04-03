var express     =   require('express');
var app         =   express();
var fs          =   require('fs');
var path        =   require('path');


app.use(express.static(path.join(__dirname, '')));

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
      res.send(text);
    });
});



module.exports = app
