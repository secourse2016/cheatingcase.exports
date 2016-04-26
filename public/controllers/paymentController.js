 swissAir.controller('paymentController',function($scope,AirportsSrv){

        //This backend is the remaining to handle : Omran & Sedki

        // retrieved Info About Outgoing Flight
        $scope.outgoingFlightID= AirportsSrv.getOutgoingFlightID();
        $scope.outgoingFlightAirline= AirportsSrv.getOutgoingFlightAirline();

        // retrieved Info About Return Flight
        $scope.returnFlightID= AirportsSrv.getReturnFlightID();
        $scope.returnFlightAirline= AirportsSrv.getReturnFlightAirline();

        // retrieved Cost
        $scope.cost= AirportsSrv.getCost();

        //azon keda kol elly m7tageno m3ako


        $scope.receipt_number= 0;

        // Payment vars

        $scope.book = function(){
          //handle All the Cases here Guys , Diff Airlines have two seperate booking , Same Airline has just one
          // wl klam da ... m3ako l variables foo2 .. el3abo
          // btw .. l function de will be called lw das Book 

        };

        $scope.$watch('receipt_number', function() {
          $scope.bookingRefNumber = "JSW"+$scope.receipt_number;
        });
     });
