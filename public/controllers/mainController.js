
swissAir.controller('mainController', function($scope,AirportsSrv,$location,$filter) {


  this.tripType = 2; //initially Round-Trip
  this.selectTripType = function(setTrip){
    this.tripType = setTrip;
  };

  this.isTripType = function(checkTrip){
    return this.tripType === checkTrip;
  };


  this.adultsCount = 1;
  this.otherAirlines=false;
  this.searchBy="shedule"

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
    AirportsSrv.setSelectedDepartureDate($filter('date')($scope.departureDate,'fullDate'));
    });

    $scope.$watch('returnDate', function() {
    AirportsSrv.setSelectedReturnDate($filter('date')($scope.returnDate,'fullDate'));
    });

    /* Find All Available Flights  */
    $scope.SearchFlights = function() {
      $location.url('/flights');
    };
    /* Get Airports on page render  */
    AirportCodes();

});
