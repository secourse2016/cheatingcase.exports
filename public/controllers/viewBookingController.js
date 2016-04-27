swissAir.controller('viewBookingController',function($scope){
$scope.booking =
{
"passengerDetails": [
  {"firstName":"Mark","lastName":"Nader","passportNum":1242,"passportExpirtyDate":1460757600000,"dateOfBirth":1460757600000,"nationality":"Egypt","email":"markynader@yahoo.com"},
  {"firstName":"Ahmed","lastName":"Omran","passportNum":1321,"passportExpirtyDate":1460757600000,"dateOfBirth":1460757600000},
  {"firstName":"Thabet","lastName":"Ashraf","passportNum":1749,"passportExpirtyDate":1460757600000,"dateOfBirth":1460757600000,"email":"markynader@yahoo.com"},
  {"firstName":"Sedki","lastName":"Gabra","passportNum":8442,"passportExpirtyDate":1460757600000,"dateOfBirth":1460757600000,"nationality":"Egypt"},
  {"firstName":"Kollo","lastName":"Walid","passportNum":2422,"passportExpirtyDate":1460757600000,"dateOfBirth":1460757600000,"nationality":"Egypt","email":"kollo@walid.com"},
],
"cost":30,
"refNum":"hdgashgd123",
"outgoingFlightId":"qwodnwqnd",
"returnFlightId":"3612781h2ehw",
"class":"economy",
"outgoingSeats":[
  {"seatNum":"1B"},
  {"seatNum":"2K"},
  {"seatNum":"2H"},
  {"seatNum":"2A"},
  {"seatNum":"3A"}
],
"returnSeats":[
  {"seatNum":"2B"},
  {"seatNum":"3K"},
  {"seatNum":"3H"},
  {"seatNum":"3A"},
  {"seatNum":"4A"}
]
}

$scope.checkNationality = function(index){
  return ($scope.booking.passengerDetails[index-1].nationality == undefined);
};

$scope.checkEmail = function(index){
  return ($scope.booking.passengerDetails[index-1].email == undefined);
};
});
