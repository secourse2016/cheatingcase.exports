swissAir.controller('flightsControllerRoundTrip', function($scope,$location,AirportsSrv) {
  $scope.origin = AirportsSrv.getSelectedOriginAirport();
  $scope.destination = AirportsSrv.getSelectedDestinationAirport();
  $scope.departureDate= AirportSrv.getSelectedDepartureDate();
  $scope.returnDate = AirportSrv.getSelectedReturnDate();
  $scope.outgoingFlights ;

  $scope.returnFlights ;

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
