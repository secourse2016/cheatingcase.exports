
swissAir.controller('mainController', function($scope,AirportsSrv,$location) {

  // Form elements

  $scope.tripType = 2; //initially Round-Trip
  $scope.departureTime="1";
  $scope.returnTime="1";
  $scope.adultsCount = "1";
  $scope.childrenCount = "0";
  $scope.class = "0";
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
  $scope.dateOptionsReturn = {
        maxDate: new Date(2016, 4, 31),
        minDate: new Date(($scope.dateOptions.minDate.getTime())+(24*60*60*1000))
    };
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

    $scope.flipOtherAirlines = function() {
      AirportsSrv.setOtherAirlines($scope.otherAirlines);
      $scope.otherAirlines = !$scope.otherAirlines;
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
      $scope.returnDate= null;
      $scope.dateOptionsReturn.minDate = ($scope.departureDate==null)?
      new Date(($scope.dateOptions.minDate.getTime())+(24*60*60*1000))
      :new Date(($scope.departureDate.getTime())+(24*60*60*1000));
      AirportsSrv.setSelectedDepartureDate($scope.departureDate);

    });

    $scope.$watch('returnDate', function() {
      if($scope.returnDate!=null && $scope.returnDate.getTime()<=$scope.departureDate.getTime())
       $scope.returnDate=null;
      AirportsSrv.setSelectedReturnDate($scope.returnDate);
    });

    /* Find All Available Flights  */
    $scope.SearchFlights = function() {
      if($scope.tripType == 2)
        $location.url('/flightsRoundTrip'); // edit to route to round trip or one way
        //Append /:$scope.class to url flightsRoundTrip as query after you do the rout editing
      else
        $location.url('/flightsOneWay'); // Who implements the view must abide to this naming convention
        //Append /:$scope.class to url flightsOneWay as query after you do the rout editing
    };
    /* Get Airports on page render  */
    AirportCodes();

});
