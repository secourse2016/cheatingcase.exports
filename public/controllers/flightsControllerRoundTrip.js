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

<<<<<<< HEAD
  $scope.pay = function() {
=======
  $scope.pay = function(index,type) {
    if(type=='btn-info'){
      AirportsSrv.setDisplayedFlightDate($scope.outgoingFlights[index].departureDateTime);
      AirportsSrv.setDisplayedFlightNumber($scope.outgoingFlights[index].flightNumber);
    }
    else{
      AirportsSrv.setDisplayedFlightDate($scope.returnFlights[index].departureDateTime);
      AirportsSrv.setDisplayedFlightNumber($scope.returnFlights[index].flightNumber);
    }
>>>>>>> scrumBranch
    $location.url('/flights/pay');
  };
});
