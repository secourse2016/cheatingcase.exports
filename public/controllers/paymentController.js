swissAir.controller('paymentController',function($scope,AirportsSrv,stripe){

  // retrieved Info About Outgoing Flight
  $scope.outgoingFlightID= AirportsSrv.getOutgoingFlightID();
  $scope.outgoingFlightAirline= AirportsSrv.getOutgoingFlightAirline();

  // retrieved Info About Return Flight
  $scope.returnFlightID= AirportsSrv.getReturnFlightID();
  $scope.returnFlightAirline= AirportsSrv.getReturnFlightAirline();

  // retrieved Cost
  $scope.cost= AirportsSrv.getCost();
  $scope.class = AirportsSrv.getSelectedClass();

  $scope.passengerDetails = AirportsSrv.getPassengerArray();


  $scope.receipt_number= 0;

  $scope.book = function(){
    stripe.card.createToken({
      "number": $scope.cardnumber,
      "cvc": $scope.cvCode,
      "exp_month": $scope.cardExpMonth,
      "exp_year": $scope.cardExpYear
    }).then(function(paymentToken){
      if($scope.outgoingFlightAirline == $scope.returnFlightAirline || $scope.returnFlightAirline==undefined){
        AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.outgoingFlightID,$scope.returnFlightID,paymentToken,$scope.outgoingFlightAirline,$scope.class).then(function(res){
          console.log(res.errorMessage);
          if(res.errorMessage==null){
            console.log("same airline case true"+$scope.class+"  ---  "+$scope.outgoingFlightID);
            $scope.refNum = res.refNum;
          }
          else {
            console.log("same airline case false");
          }
        });

      }
      else{
        AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.outgoingFlightID,null,paymentToken,$scope.outgoingFlightAirline,$scope.class).then(function(resOutgoing){
          console.log(resOutgoing.errorMessage);
          if(resOutgoing.errorMessage==null){
            console.log("different airlines outgoingFlight case true");
            $scope.refNum = resOutgoing.refNum;
          }
          else {
            console.log("different airlines outgoingFlight case false");

          }
          AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.returnFlightID,null,paymentToken,$scope.returnFlightAirline,$scope.class).then(function(resReturn){
            console.log(resReturn.errorMessage);
            if(resReturn.errorMessage==null){
              console.log("different airlines returnFlight case true");
              $scope.refNum +="\n"+resReturn.refNum;
            }
            else {
              console.log("different airlines returnFlight case false");
            }
          });
        });

      }
    });
  };

  $scope.$watch('receipt_number', function() {
    $scope.bookingRefNumber = "JSW"+$scope.receipt_number;
  });
});
