swissAir.controller('flightsOneWayController', function($scope,$location,AirportsSrv) {
  $scope.origin = AirportsSrv.getSelectedOriginAirport();
  $scope.destination = AirportsSrv.getSelectedDestinationAirport();
  $scope.departureDate= new Date(AirportsSrv.getSelectedDepartureDate()).getTime();
  $scope.returnDate = new Date(AirportsSrv.getSelectedReturnDate()).getTime();
  AirportsSrv.searchFlightsOneWay($scope.origin,$scope.destination,$scope.departureDate)
  .success(function(flights){
    $scope.outgoingFlights=flights.outgoingFlights;
  });

  $scope.findType = function(flight){
    return "btn-info";
  };

<<<<<<< HEAD
  $scope.pay = function() {
=======
  $scope.pay = function(index,type) {
    AirportsSrv.setDisplayedFlightDate($scope.outgoingFlights[index].departureDateTime);
    AirportsSrv.setDisplayedFlightNumber($scope.outgoingFlights[index].flightNumber);
>>>>>>> scrumBranch
    $location.url('/flights/pay');
  };
});
