
swissAir.controller('mainController', function($scope,AirportsSrv,$location,$filter) {


  /*----------- Angular Bootstrap Datepicker -----------*/
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  $scope.dateOptions = {
      maxDate: new Date(2016, 4, 31),
      minDate: new Date()
    };
//  $scope.fullDepartureDate= "$filter('date')($scope.departureDate,'fullDate')";
//  $scope.fullReturnDate = $filter('date')($scope.returnDate,'fullDate');

  /* Retrieve List of Airports Codes */
    function AirportCodes() {
      AirportsSrv.getAirportCodes().success(function(airports) {
           $scope.Airports = airports;
       });
    };

    /* Record User's Selected Origin Airport  */
    $scope.SetOriginAirport = function(originAirport) {
      AirportsSrv.setSelectedOriginAirport(originAirport);
    };

    /* Record User's Selected Destination Airport  */
    $scope.SetDestinationAirport = function(destAirport) {
      AirportsSrv.setSelectedDestinationAirport(destAirport);
    };

    /* Find All Available Flights  */
    $scope.SearchFlights = function() {
      $location.url('/flights');
    };

    /* Get Airports on page render  */
    AirportCodes();

});
