swissAir.controller('flightsControllerRoundTrip', function($scope,$location,AirportsSrv) {
  $scope.disabled = true;
  $scope.outgoingDisabled = true;
  $scope.returnDisabled = true;
  $scope.outgoingCost = 0;
  $scope.returnCost = 0;
  $scope.Total = 0;
  $scope.outgoingFlights= AirportsSrv.getOutgoingFlights();
  $scope.returnFlights =AirportsSrv.getReturnFlights();
  $scope.seats = AirportsSrv.getSelectedSeats();

  $scope.$watch('seats', function() {
    $scope.passengerArray = [];
    for(var i=0; i<$scope.seats; i++){
      $scope.passengerArray.push({"firstName":"","lastName":"","passportNum":0,"passportExpiryDate":0,
      "dateOfBirth":0,"nationality":"","email":""});
    }
    AirportsSrv.setPassengerArray($scope.passengerArray);
  });

  $scope.findType = function(flight){
    var i = $scope.outgoingFlights.length;
    while (i--) {
      if ($scope.outgoingFlights[i] === flight) {
        return "info";
      }
    }
    return "danger";
  };

  $scope.findColor = function(flight){
    var i = $scope.outgoingFlights.length;
    while (i--) {
      if ($scope.outgoingFlights[i] === flight) {
        return "color: rgb(0,139,139)";
      }
    }
    return "color: rgb(228,40,18)";
  };



  $scope.clearOthers = function(index,type){
    if(type=="info"){
      angular.forEach($scope.outgoingFlights, function(flight, position) {
        if (position != index){
          $scope.outgoingFlights[position].checked = false;
        }

        else{
          $scope.outgoingFlights[position].checked = true;
        }

      });
    }

    else{
      angular.forEach($scope.returnFlights, function(flight, position) {
        if (position != index){
          $scope.returnFlights[position].checked = false;
        }

        else{
          $scope.returnFlights[position].checked = true;
        }

      });
    }

  };

  $scope.isDisabled = function(){
    var broke = false;
    for(var i=0;i<$scope.outgoingFlights.length;i++){
        if($scope.outgoingFlights[i].checked){
          $scope.outgoingCost = parseInt($scope.outgoingFlights[i].cost) * $scope.seats ;
          $scope.outgoingDisabled = false;
          broke=true;
          break;
        }
    }

    for(var j=0;j<$scope.returnFlights.length;j++){
        if($scope.returnFlights[j].checked){
          $scope.returnCost = parseInt($scope.returnFlights[j].cost) * $scope.seats ;
          $scope.returnDisabled = false;
          if(broke){
            $scope.Total = $scope.outgoingCost + $scope.returnCost
            $scope.disabled=false;
            return;
          }
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
    for(var j=0;j<$scope.returnFlights.length;j++){
        if($scope.returnFlights[j].checked){
          var returnFlight = $scope.returnFlights[j];
          break;
        }
    }
    AirportsSrv.setOutgoingFlightID(outgoingFlight._id);//return here for error
    AirportsSrv.setOutgoingFlightAirline(outgoingFlight.Airline);
    AirportsSrv.setReturnFlightID(returnFlight._id);//return here for error
    AirportsSrv.setReturnFlightAirline(returnFlight.Airline);
    AirportsSrv.setCost($scope.Total);
    $location.url('/flights/confirm');
  };


});
