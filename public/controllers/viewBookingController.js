swissAir.controller('viewBookingController',function($scope,AirportsSrv){
$scope.booking = AirportsSrv.viewBooking(AirportsSrv.getbookingRefNum());

$scope.checkNationality = function(index){
  return ($scope.booking.passengerDetails[index-1].nationality == undefined);
};

$scope.checkEmail = function(index){
  return ($scope.booking.passengerDetails[index-1].email == undefined);
};
});
