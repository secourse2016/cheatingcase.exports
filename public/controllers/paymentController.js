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
  $scope.outgoingFlightAirlineURL = "";
  $scope.returnFlightAirlineURL = "";


  $scope.receipt_number= 0;

  $scope.book = function(){
    var sameAirline = ($scope.outgoingFlightAirline == $scope.returnFlightAirline);

    if($scope.outgoingFlightAirline != "Swiss Air") {
      AirportsSrv.getAirlineDetails($scope.outgoingFlightAirline).then(function (res){
        if(res.data.errorMessage == null) {
            $scope.outgoingFlightAirlineURL = res.data.url;
            stripe.setPublishableKey(res.data.pubKey);
            stripe.card.createToken({
              "number": $scope.cardnumber,
              "cvc": $scope.cvCode,
              "exp_month": $scope.cardExpMonth,
              "exp_year": $scope.cardExpYear
            }).then(function(paymentToken){
              AirportsSrv.createBooking($scope.passengerDetails, $scope.cost, $scope.outgoingFlightID,
                ((sameAirline)?($scope.returnFlightID):(null)), paymentToken, $scope.outgoingFlightAirline, $scope.class).then(function (resOutgoing){
                  if(resOutgoing.data.errorMessage == null) $scope.refNum = resOutgoing.data.refNum + " Please refer to \""+$scope.returnFlightAirlineURL+"\" to view your booking details";
                  else $scope.refNum = resOutgoing.data.errorMessage;
                  stripe.setPublishableKey('pk_test_0HCCWDzLKJrDq1i0QuB7yrXA');
              });
            });
        } else {
          $scope.refNum = "Could Not Retrieve Airline's \""+$scope.outgoingFlightAirline+"\" Public Key.";
        }
      });
    } else {
      stripe.card.createToken({
        "number": $scope.cardnumber,
        "cvc": $scope.cvCode,
        "exp_month": $scope.cardExpMonth,
        "exp_year": $scope.cardExpYear
      }).then(function (paymentToken){
        AirportsSrv.createBooking($scope.passengerDetails, $scope.cost, $scope.outgoingFlightID,
          ((sameAirline)?($scope.returnFlightID):(null)), paymentToken, $scope.outgoingFlightAirline, $scope.class).then(function (resOutgoing){
            if(resOutgoing.data.errorMessage == null) $scope.refNum = resOutgoing.data.refNum;
            else $scope.refNum = resOutgoing.data.errorMessage;
        });
      });
    }

    if($scope.returnFlightAirline && !(sameAirline)) {

      if($scope.returnFlightAirline != "Swiss Air") {
        AirportsSrv.getAirlineDetails($scope.returnFlightAirline).then(function (res){
          if(res.data.errorMessage == null) {
              $scope.returnFlightAirlineURL = res.data.url;
              stripe.setPublishableKey(res.data.pubKey);
              stripe.card.createToken({
                "number": $scope.cardnumber,
                "cvc": $scope.cvCode,
                "exp_month": $scope.cardExpMonth,
                "exp_year": $scope.cardExpYear
              }).then(function(paymentToken){
                AirportsSrv.createBooking($scope.passengerDetails, $scope.cost, $scope.returnFlightID,
                  null, paymentToken, $scope.returnFlightAirline, $scope.class).then(function (resReturn){
                    if(resReturn.data.errorMessage == null) $scope.refNum = resReturn.data.refNum + " Please refer to \""+$scope.returnFlightAirlineURL+"\" to view your booking details";
                    else $scope.refNum = resReturn.data.errorMessage;
                    stripe.setPublishableKey('pk_test_0HCCWDzLKJrDq1i0QuB7yrXA');
                });
              });
          } else {
            $scope.refNum += "Could Not Retrieve Airline's \""+$scope.returnFlightAirline+"\" Public Key.";
          }
        });
      } else {
        stripe.card.createToken({
          "number": $scope.cardnumber,
          "cvc": $scope.cvCode,
          "exp_month": $scope.cardExpMonth,
          "exp_year": $scope.cardExpYear
        }).then(function (paymentToken){
          AirportsSrv.createBooking($scope.passengerDetails, $scope.cost, $scope.returnFlightID,
            null, paymentToken, $scope.returnFlightAirline, $scope.class).then(function (resReturn){
              if(resReturn.data.errorMessage == null) $scope.refNum += resReturn.data.refNum;
              else $scope.refNum += resReturn.data.errorMessage;
          });
        });

      }

    }


  };

  $scope.$watch('receipt_number', function() {
    $scope.bookingRefNumber = "JSW"+$scope.receipt_number;
  });
});
