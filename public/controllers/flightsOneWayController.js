swissAir.controller('flightsOneWayController', function($scope,$location,AirportsSrv) {
  $scope.disabled=true;
  $scope.outgoingFlights= AirportsSrv.getOutgoingFlights();

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
