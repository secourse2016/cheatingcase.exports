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

        $scope.passengerDetails = AirportsSrv.getPassengerArray();


        $scope.receipt_number= 0;

        // Payment vars



        $scope.book = function(){
         stripe.card.createToken({
            "number": $scope.cardnumber,
            "cvc": $scope.cvCode,
            "exp_month": $scope.cardExpMonth,
            "exp_year": $scope.cardExpYear
          }).then(function(paymentToken){
            console.log(paymentToken);
            if($scope.outgoingFlightAirline == $scope.returnFlightAirline || $scope.returnFlightAirline==undefined){
               if($scope.outgoingFlightAirline=="Swiss Air"){
                 AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.outgoingFlightID,$scope.returnFlightID,paymentToken,true,$scope.outgoingFlightAirline).then(function(res){
                   if(res.errorMessage!=null)
                   $scope.refNum = res.refNum;
                 });
               }
           else{
             AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.outgoingFlightID,$scope.returnFlightID,paymentToken,false,$scope.outgoingFlightAirline).then(function(res){
               if(res.errorMessage!=null)
               $scope.refNum = res.refNum;
             });
           }
         }
         else{
           if(outgoingFlight.Airline!="Swiss Air" && returnFlight.Airline!= "Swiss Air"){
             AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.outgoingFlightID,null,paymentToken,false,$scope.outgoingFlightAirline);

             AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.returnFlightID,null,paymentToken,false,$scope.returnFlightAirline);
           }
           else{
             if(outgoingFlight.Airline!="Swiss Air"){
             AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.outgoingFlightID,null,paymentToken,true,$scope.outgoingFlightAirline);
             AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.returnFlightID,null,paymentToken,false,$scope.returnFlightAirline);
           }
           AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.outgoingFlightID,null,paymentToken,false,$scope.outgoingFlightAirline);
           AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.returnFlightID,null,paymentToken,true,$scope.returnFlightAirline);
           }
         }
          });




        };

        $scope.$watch('receipt_number', function() {
          $scope.bookingRefNumber = "JSW"+$scope.receipt_number;
        });
     });
