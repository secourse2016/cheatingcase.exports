swissAir.controller('paymentController',function($scope,AirportsSrv,stripe){

  $scope.otherAirline = false;
   $scope.formHide = false;

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

  $scope.refNum = "";
  $scope.refNum2 = "";
  $scope.receipt_number= 0;

  if($scope.outgoingFlightAirline!="Swiss Air" && $scope.returnFlightAirline !="Swiss Air" ){
    console.log($scope.outgoingFlightAirline)
    $scope.otherAirline = true;
  }


  $scope.book = function(){
    $scope.formHide = true ;
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
                ((sameAirline)?($scope.returnFlightID):(null)), paymentToken, $scope.outgoingFlightAirline, $scope.class,$scope.phone).then(function (resOutgoing){
                  if(resOutgoing.data.errorMessage == null) {
                    console.log('SUCCESS: case outgoing is not swissAir and it is '+ ((sameAirline)?'the same as':'different from') + 'the return airline.');
                    $scope.refNum += "Booking: " + resOutgoing.data.refNum + " Please refer to \""+$scope.outgoingFlightAirlineURL+"\" to view your booking details.";
                  }
                  else {
                    console.log('FAILURE: case outgoing is not swissAir and it is '+ ((sameAirline)?'the same as':'different from') + 'the return airline.');
                    $scope.refNum += "Booking: " + resOutgoing.data.errorMessage + ".";
                  }
                  stripe.setPublishableKey('pk_test_0HCCWDzLKJrDq1i0QuB7yrXA');
              });
            });
        } else {
          console.log('FAILURE: case outgoing is not swissAir and it is '+ ((sameAirline)?'the same as':'different from') + 'the return airline.');
          $scope.refNum += "Booking: Could Not Retrieve Airline's \""+$scope.outgoingFlightAirline+"\" Public Key.";
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
          ((sameAirline)?($scope.returnFlightID):(null)), paymentToken, $scope.outgoingFlightAirline, $scope.class,$scope.phone).then(function (resOutgoing){
            if(resOutgoing.data.errorMessage == null) {
              console.log('SUCCESS: case outgoing IS swissAir and it is '+ ((sameAirline)?'the same as':'different from') + 'the return airline.');
              $scope.refNum += "Booking: " + resOutgoing.data.refNum + " Please go to \"View Booking\" to view your booking details.";
            }
            else {
              console.log('FAILURE: case outgoing IS not swissAir and it is '+ ((sameAirline)?'the same as':'different from') + 'the return airline.');
              $scope.refNum += "Booking: " + resOutgoing.data.errorMessage + ".";
            }
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
                  null, paymentToken, $scope.returnFlightAirline, $scope.class,$scope.phone).then(function (resReturn){
                    if(resReturn.data.errorMessage == null) {
                      console.log('SUCCESS: case return is NOT swissAir and is different than outgoing');
                      $scope.refNum2 += "Booking: " + resReturn.data.refNum + " Please refer to \""+$scope.returnFlightAirlineURL+"\" to view your booking details.";
                    }
                    else {
                      console.log('FAILURE: case return is NOT swissAir and is different than outgoing');
                      $scope.refNum2 += "Booking: " + resReturn.data.errorMessage + ".";
                    }
                    stripe.setPublishableKey('pk_test_0HCCWDzLKJrDq1i0QuB7yrXA');
                });
              });
          } else {
            console.log('FAILURE: case return is NOT swissAir and is different than outgoing');
            $scope.refNum2 += "Booking: Could Not Retrieve Airline's \""+$scope.returnFlightAirline+"\" Public Key.";
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
            null, paymentToken, $scope.returnFlightAirline, $scope.class,$scope.phone).then(function (resReturn){
              if(resReturn.data.errorMessage == null) {
                console.log('SUCCESS: case return IS swissAir and it is different than outgoing');
                $scope.refNum2 += "Booking: " + resReturn.data.refNum + " Please go to \"View Booking\" to view your booking details.";
              }
              else {
                console.log('FAILURE: case return IS not swissAir and it is different than outgoing');
                $scope.refNum2 += "Booking: " + resReturn.data.errorMessage + ".";
              }
          });
        });

      }

    }


  };

  $scope.$watch('receipt_number', function() {
    $scope.bookingRefNumber = "JSW"+$scope.receipt_number;
  });
});
