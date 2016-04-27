 swissAir.controller('paymentController',function($scope,AirportsSrv,stripe){

        //This backend is the remaining to handle : Sedki & Omran not Omran & Sedki :)

        // retrieved Info About Outgoing Flight
        $scope.outgoingFlightID= AirportsSrv.getOutgoingFlightID();
        $scope.outgoingFlightAirline= AirportsSrv.getOutgoingFlightAirline();

        // retrieved Info About Return Flight
        $scope.returnFlightID= AirportsSrv.getReturnFlightID();
        $scope.returnFlightAirline= AirportsSrv.getReturnFlightAirline();

        // retrieved Cost
        $scope.cost= AirportsSrv.getCost();


        $scope.receipt_number= 0;

        // Payment vars

        $scope.book = function(){
          /*
          strip.card.createToken({
            "number": number,
            "cvc": cvc,
            "exp_month": exp_month,
            "exp_year": exp_year
          }, stripeResponseHandler);
          */

        };

        $scope.$watch('receipt_number', function() {
          $scope.bookingRefNumber = "JSW"+$scope.receipt_number;
        });
     });
