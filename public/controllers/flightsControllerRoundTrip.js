swissAir.controller('flightsControllerRoundTrip', function($scope,$location,AirportsSrv) {
  $scope.disabled = true;
  $scope.outgoingFlights= AirportsSrv.getOutgoingFlights();
  $scope.returnFlights =AirportsSrv.getReturnFlights();


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
          broke=true;
          break;
        }
    }

    if(!broke){
      $scope.disabled=true;
      return;
    }

    for(var j=0;j<$scope.returnFlights.length;j++){
        if($scope.returnFlights[j].checked){
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
    console.log(outgoingFlight+"Hello Outgoing");
    for(var j=0;j<$scope.returnFlights.length;j++){
      console.log($scope.returnFlights[j].checked+" is checked");
        if($scope.returnFlights[j].checked){
          var returnFlight = $scope.returnFlights[j];
          break;
        }
    }
    //Now we Retrieved  One Outgoing Flight and One Return Flight , we have 4 cases to handle
    if(outgoingFlight.Airline == returnFlight.Airline){
        if(outgoingFlight.Airline=="Swiss Air"){
          /* Case 1 :- Both Flights Are From the same airline , This airline is me !
           In this case, I set my variables and redirect my user to my front end to pay both flights*/
          AirportsSrv.setDisplayedOutgoingFlightDate(outgoingFlight.departureDateTime);
          AirportsSrv.setDisplayedOutgoingFlightNumber(outgoingFlight.flightNumber);
          AirportsSrv.setDisplayedReturnFlightDate(returnFlight.departureDateTime);
          AirportsSrv.setDisplayedReturnFlightNumber(returnFlight.flightNumber);
          $location.url('/flights/pay');
          console.log(" Two Way Case 1");
        }
        else{
        /* Case 2 :- Both Flights are From the same airline , This airline is not me
        In this Case we have to send one Post Request Containing the two flights number , the seats' count ,
        MyAirlineName and wait for two bookingNumbers from this airline as a return gift ;)
        Still Not Implemented */

        console.log(" Two Way Case 2");

        }
    }
    else{
      if(outgoingFlight.Airline != "Swiss Air" && returnFlight.Airline!= "Swiss Air"){
        /* Case 3 :- Both Flights are not from the same airline , and luckily , none of them belongs to me
        In this case , two seperate post requests should be sent to the two airlines (one per each) , and each
        request should contain again the flight Number , seats' count and myAirlineName and wait for a booking reference
        from each Airline
        Still Not Implemented*/



        console.log(" Two Way Case 3");

      }
      else{
        /* Case 4 :- Both Flights are not from the same airline , but this time , one of them belongs to me
        This Case is the least systematic one , because you should send the other company a post request and
        wait for a booking reference from it , and in the same time , you redirect the user to pay the other Flight
        in your page   */
        if(outgoingFlight.Airline == "Swiss Air"){
          /*redirect user to pay the outgoing in my view and send a post request to the other airline with
           the return flight details (flightNumber,seatCount,myAirlineName)
           Partially Implemented*/
           AirportsSrv.setDisplayedOutgoingFlightDate(outgoingFlight.departureDateTime);
           AirportsSrv.setDisplayedOutgoingFlightNumber(outgoingFlight.flightNumber);
           $location.url('/flights/pay');
           console.log("Two Way Case 4 A");
        }
        else{
          /* redirect user to pay the return flight in my view and send a post request to the other airline with
          the outgoing flight details (flightNumber,seatCount,MyAirlineName)
          Partially Implemented*/
          AirportsSrv.setDisplayedReturnFlightDate(returnFlight.departureDateTime);
          AirportsSrv.setDisplayedReturnFlightNumber(returnFlight.flightNumber);
          $location.url('/flights/pay');
          console.log("Two Way Case 4 B");
        }
      }
    }

  };
});
