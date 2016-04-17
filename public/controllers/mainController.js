
swissAir.controller('mainController', function($scope,AirportsSrv,$location) {

  // Form elements

  $scope.tripType = 2; //initially Round-Trip
  $scope.departureTime="1";
  $scope.returnTime="1";
  $scope.adultsCount = "1";
  $scope.childrenCount = "0";
  $scope.infantsCount = "0";
  $scope.otherAirlines=false;
  $scope.searchBy="schedule";

  $scope.selectTripType = function(setTrip){
    $scope.tripType = setTrip;
  };

  $scope.isTripType = function(checkTrip){
    return $scope.tripType === checkTrip;
  };

  /*----------- Angular Bootstrap Datepicker -----------*/
  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
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

    /*
    $scope.setDepartureDate = function(value){
      Console.log(value +"hi")
      AirportsSrv.setSelectedDepartureDate($scope.departureDate);
    };


    $scope.setReturnDate = function(value){
      Console.log(value + "hii");
      AirportsSrv.setSelectedReturnDate($scope.returnDate);
    };
      */
    $scope.$watch('departureDate', function() {
      AirportsSrv.setSelectedDepartureDate($scope.departureDate);
    });

    $scope.$watch('returnDate', function() {
      AirportsSrv.setSelectedReturnDate($scope.returnDate);
    });

    /* Find All Available Flights  */
    $scope.SearchFlights = function() {
      if($scope.tripType == 2)
        $location.url('/flightsRoundTrip'); // edit to route to round trip or one way
      else
        $location.url('/flightsOneWay'); // Who implements the view must abide to this naming convention
    };
    /* Get Airports on page render  */
    AirportCodes();

});
