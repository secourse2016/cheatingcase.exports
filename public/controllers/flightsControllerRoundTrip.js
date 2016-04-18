swissAir.controller('flightsControllerRoundTrip', function($scope,$location,AirportsSrv) {
  $scope.origin = AirportsSrv.getSelectedOriginAirport();
  $scope.destination = AirportsSrv.getSelectedDestinationAirport();
  $scope.departureDate= new Date(AirportsSrv.getSelectedDepartureDate()).getTime();
  $scope.returnDate = new Date(AirportsSrv.getSelectedReturnDate()).getTime();
  AirportsSrv.searchFlightsTwoWay($scope.origin,$scope.destination,$scope.departureDate,$scope.returnDate)
  .success(function(flights){
    $scope.outgoingFlights=flights.outgoingFlights;
    $scope.returnFlights=flights.returnFlights;

  });


  $scope.findType = function(flight){
    var i = $scope.outgoingFlights.length;
    while (i--) {
      if ($scope.outgoingFlights[i] === flight) {
        return "btn-info";
      }
    }
    return "btn-danger";
  };

  $scope.pay = function() {
    $location.url('/flights/pay');
  };
});
