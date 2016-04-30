
swissAir.controller('mainController', function($scope,AirportsSrv,$location) {

  // Form elements

  $scope.tripType = 2; //initially Round-Trip
  $scope.departureTime="1";
  $scope.returnTime="1";
  $scope.adultsCount = "1";
  $scope.childrenCount = "0";
  $scope.class = "1";
  $scope.otherAirlines=false;
  AirportsSrv.setOtherAirlines("false");
  $scope.animation="";
  $scope.disabled=false;

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
      $scope.otherAirlines = !$scope.otherAirlines;
      AirportsSrv.setOtherAirlines($scope.otherAirlines);
    };

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

    $scope.$watch('class', function() {
     if($scope.class=='1'){
       AirportsSrv.setSelectedClass("economy");
     }
     else{
       if($scope.class=='2'){
         AirportsSrv.setSelectedClass("business");
       }
     }
    });

    $scope.$watch('adultsCount', function() {
      AirportsSrv.setSelectedSeats(parseInt($scope.adultsCount)+parseInt($scope.childrenCount));
    });

    $scope.$watch('childrenCount', function() {
      AirportsSrv.setSelectedSeats(parseInt($scope.adultsCount)+parseInt($scope.childrenCount));
    });

    /* Find All Available Flights  */
    $scope.SearchFlights = function() {
      $scope.disabled=true;
      $scope.animation ="glyphicon glyphicon-refresh glyphicon-refresh-animate";
      if($scope.tripType == 2){
        AirportsSrv.getConcatFlightsTwoWay(AirportsSrv.getSelectedOriginAirport(),
        AirportsSrv.getSelectedDestinationAirport(),
        new Date(AirportsSrv.getSelectedDepartureDate()).getTime(),
          new Date(AirportsSrv.getSelectedReturnDate()).getTime(),
          AirportsSrv.getSelectedClass(),
          AirportsSrv.getOtherAirlines(),
          function(result){
            AirportsSrv.setOutgoingFlights(result.outgoingFlights);
            AirportsSrv.setReturnFlights(result.returnFlights);
            $location.path('/flightsRoundTrip');
          });
      }

      else{
        AirportsSrv.getConcatFlightsOneWay(AirportsSrv.getSelectedOriginAirport(),
        AirportsSrv.getSelectedDestinationAirport(),
        new Date(AirportsSrv.getSelectedDepartureDate()).getTime(),
          AirportsSrv.getSelectedClass(),
          AirportsSrv.getOtherAirlines(),
          function(result){
            AirportsSrv.setOutgoingFlights(result.outgoingFlights);
            $location.path('/flightsOneWay');
          });
      }

    };

    $scope.viewBooking = function(bookingRefNum) {
      //AirportsSrv.setbookingRefNum(bookingRefNum);
      AirportsSrv.viewBooking(bookingRefNum).success(function (data){
        if(data.error){

        } else {
          AirportsSrv.setViewedBooking(data);
          $location.path('/viewBooking');
        }

      });

    }
    /* Get Airports on page render  */
    AirportCodes();

});
