var express     =   require('express');
var app         =   express();
var fs          =   require('fs');
var path        =   require('path');

var jwt     = require('jsonwebtoken');
require('dotenv').load();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
      res.send(text);
    });
});


// Middleware Function for securing routes using JWT
app.use(function(req, res, next) {

  var jwtToken = req.headers['x-access-token'];
  console.log("Token received !! ", jwtToken);

  var jwtSecret = process.env.JWTSECRET;
  try
  {
    var jwtPayload = jwt.verify(jwtToken, jwtSecret);
    req.payload = payload;
    next();
  }
  catch (err)
  {
    console.error('JWT Error : ', err);
    fs.readFile(__dirname + '/public/Error403.html', 'utf8', function(err, text){
      res.status(403).send(text);
    });
  }

});
app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
        // retrieve params from req.params.{{origin | departingDate | ...}}
        // return this exact format
        db.DB.collection('flights').find({'origin':origin && 'destination':destination && 'departingDate':departingDate && 'returningDate':returningDate}).toArray(function(err,data){
            if(err){
              console.log(err);
            }else{
          res=data;
        }
        })
        
    }


module.exports = app
