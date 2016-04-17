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

  $scope.pay = function() {
    $location.url('/flights/pay');
  };
});
