swissAir.controller('flightsOneWayController', function($scope,$location,AirportsSrv) {
  $scope.origin = AirportsSrv.getSelectedOriginAirport();
  $scope.destination = AirportsSrv.getSelectedDestinationAirport();
  $scope.departureDate= new Date(AirportsSrv.getSelectedDepartureDate()).getTime();
  $scope.returnDate = new Date(AirportsSrv.getSelectedReturnDate()).getTime();
  $scope.class=AirportsSrv.getSelectedClass();
  $scope.otherAirlines = AirportsSrv.getOtherAirlines();
  $scope.disabled=true;

  AirportsSrv.getConcatFlightsOneWay($scope.origin,$scope.destination,$scope.departureDate,
    $scope.class,$scope.otherAirlines,function(result){
      $scope.outgoingFlights= result.outgoingFlights;
    });

  $scope.findType = function(flight){
    return "info";
  };

  $scope.findColor = function(flight){
    return "color: rgb(0,139,139)";
  };

  $scope.clearOthers = function(index,type){
      angular.forEach($scope.outgoingFlights, function(flight, position) {
        if (position != index){
          $scope.outgoingFlights[position].checked = false;
        }

        else{
          $scope.outgoingFlights[position].checked = true;
        }

      });
  }

  $scope.isDisabled = function(){
    for(var i=0;i<$scope.outgoingFlights.length;i++){
        if($scope.outgoingFlights[i].checked){
          $scope.disabled=false;
          return;
        }
    }
    $scope.disabled=true;
  }

  $scope.pay = function() {

    for(var i=0;i<$scope.outgoingFlights.length;i++){
        if($scope.outgoingFlights[i].checked){
          var outgoingFlight = $scope.outgoingFlights[i];
          break;
        }
    }
    if(outgoingFlight.Airline == "Swiss Air"){
      /* Easy Case :- My payment ! */
      AirportsSrv.setDisplayedOutgoingFlightDate(outgoingFlight.departureDateTime);
      AirportsSrv.setDisplayedOutgoingFlightNumber(outgoingFlight.flightNumber);
      $location.url('/flights/pay');
      console.log("One Way Case 1");
    }
    else {
      /* Send a post request to the other Airline*/
      console.log("One Way Case 2");
    }


  };
});
