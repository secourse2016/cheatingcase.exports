swissAir.controller('viewBookingController',function($scope,AirportsSrv){
$scope.booking = AirportsSrv.getViewedBooking();

$scope.checkNationality = function(index){
  return (($scope.booking.passengerDetails[index-1].nationality == undefined) || ($scope.booking.passengerDetails[index-1].nationality == "") || ($scope.booking.passengerDetails[index-1].nationality == null));
};

$scope.checkEmail = function(index){
  return (($scope.booking.passengerDetails[index-1].email == undefined) || ($scope.booking.passengerDetails[index-1].email == "") || ($scope.booking.passengerDetails[index-1].email == null));
};

$scope.checkReturn = function(index){
  return (($scope.booking.returnFlightId == undefined) || ($scope.booking.returnFlightId == null));
};

});
