angular.module('starter.controllers', [])

.controller('SearchflightCtrl', function($scope, $ionicLoading, $timeout) {

 $ionicLoading.show({
    content: 'Loading',
    template:'please wait...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
  $timeout(function () {
    $ionicLoading.hide();
  }, 500);
})

.controller('SearchCtrl', function($scope, $ionicLoading, $timeout, $state) {

 $ionicLoading.show({
    content: 'Loading',
    template:'please wait...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
  $timeout(function () {
    $ionicLoading.hide();
  }, 500);

  $scope.search=function(){
   $state.go('tab.search');
  }
})

.controller('DashCtrl', function($scope, $ionicLoading, $timeout, $ionicPopover, $state, $ionicHistory) {
   // .fromTemplate() method

   var template = '<ion-popover-view>' +
                  '<ion-header-bar class="bar bar-assertive">' +
                  '<h1 class = "title" style="text-align:center"><strong>Join us on</strong></h1>' +
                  '</ion-header-bar>'+ '<ion-content>' +
                  '<div class="list">'+'<div class="item item-icon-left">'+'<strong style="color:red"> facebook </strong>'+'<span class="badge badge-assertive">'+'<i class="ion-social-facebook"></i>'+'</span>'+'</a>'+'</div>'+
                  '<div class="item item-icon-left">'+'<strong style="color:red"> twitter </strong>'+'<span class="badge badge-assertive">'+'<i class="ion-social-twitter"></i>'+'</span>'+'</div>'+
                  '<div class="item item-icon-left">'+'<strong style="color:red"> instagram </strong>'+'<span class="badge badge-assertive">'+'<i class="ion-social-instagram"></i>'+'</span>'+'</div>'+
                  '</div>' +
                  '</ion-content>' + '</ion-popover-view>';

   $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
   });

   $scope.openPopover = function($event) {
      $scope.popover.show($event);
   };

   $scope.closePopover = function() {
      $scope.popover.hide();
   };

   //Cleanup the popover when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.popover.remove();
   });

   // Execute action on hide popover
   $scope.$on('popover.hidden', function() {
      // Execute action
   });

   // Execute action on remove popover
   $scope.$on('popover.removed', function() {
      // Execute action
   });

  $scope.gotohome= function() {
    $ionicHistory.goBack();
    window.history.back();
    //alert('code to go back called. Did it work?');
  }

})

.controller('AboutCtrl', function($scope, $ionicPopup, $state, $ionicLoading, $timeout) {

   $ionicLoading.show({
    content: 'Loading',
    template:'please wait...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
  $timeout(function () {
    $ionicLoading.hide();
  }, 500);

   // When button is clicked, the popup will be shown...
   $scope.showPopup1 = function() {
      $scope.data = {}

      // Custom popup
      var myPopup1 = $ionicPopup.show({
         template: '<p style="font-family:Times New Roman">It was formed from a merger between Balair and Ad Astra Aero (To the Stars). For most of its 85 years, Swissair was one of the major international airlines.</p>',
         title: 'Our Humble Beginnings',
         subTitle: '<img src="./img/about1.jpg">',
         scope: $scope,

         buttons: [
             {
               text: '<b>ok</b>',
               type: 'button-assertive'
            }
         ]
      });

      myPopup1.then(function(res) {
         console.log('Tapped!', res);
      });
   },
   $scope.showPopup2 = function() {
      $scope.data = {}

      // Custom popup
      var myPopup2 = $ionicPopup.show({
         template: '<p style="font-family:Times New Roman">As Switzerland national airline, SWISS is committed to the highest standards of product and AirportsSrv quality. The airline flies some 16 million passengers every year to over 105 destinations all over the world.</p>',
         title: 'For the people in the company',
         subTitle: '<img src="./img/about2.jpg">',
         scope: $scope,

         buttons: [
             {
               text: '<b>ok</b>',
               type: 'button-assertive'
            }
         ]
      });

      myPopup2.then(function(res) {
         console.log('Tapped!', res);
      });
   },
   $scope.showPopup3 = function() {
      $scope.data = {}

      // Custom popup
      var myPopup3 = $ionicPopup.show({
         template: '<p style="font-family:Times New Roman">From its hub in Zurich and the regional airport of Geneva, Swiss International Air Lines flies to 105 destinations in 49 countries: 79 in Europe and 26 overseas. There are 94 aircraft in the airline fleet. SWISS is part of the Lufthansa Group and a member of the Star Alliance.</p>',
         title: '16 million passengers,<br> 105 destinations.',
         subTitle: '<img src="./img/about3.jpg">',
         scope: $scope,

         buttons: [
             {
               text: '<b>ok</b>',
               type: 'button-assertive'
            }
         ]
      });

      myPopup3.then(function(res) {
         console.log('Tapped!', res);
      });
   };

   $scope.gotoContact=function(){
    $state.go("Contact");
   }

})

.controller('ContactCtrl', function($scope,$ionicLoading,$timeout, $ionicScrollDelegate){

$ionicLoading.show({
    content: 'Loading',
    template:'pleasewait...',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });

  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
  $timeout(function () {
    $ionicLoading.hide();
  }, 1000);
  $scope.scrollBottom= function() {
    $ionicScrollDelegate.scrollBottom();
  };

  $scope.show= function(){
    $scope.open=true
  }
$scope.name=null;
$scope.email=null;
$scope.telephone=null;
$scope.msg=null;
$scope.send=function(){
   if($scope.name===null){
   $ionicLoading.show({
    content: 'Loading',
    template:'sending...',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });

  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
  $timeout(function () {
    $ionicLoading.hide();
  }, 1000);
}
}
})

.controller('HomeCtrl', function($scope,$ionicSlideBoxDelegate,$state ) {

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
   };

    $scope.gotoSearchFlights=function(){
    $state.go("searchflights");
   };
})

/* One-Way-Controller*/
.controller('SearchflightCtrlOneWay', function($scope,$state,AirportsSrv) {
  $scope.details = {
    "departureTime": "1",
    "returnTime":"1",
    "adultsCount":"1",
    "childrenCount":"0",
    "class":"1",
    "otherAirlines":false
  };
  $scope.adultsCount="1";
  $scope.ChangeInAdults = function(){
    console.log("hello");
  }

  $scope.SetOriginAirport = function(originAirport) {
    AirportsSrv.setSelectedOriginAirport(originAirport);
  };  

  /* Record User's Selected Destination Airport  */
  $scope.SetDestinationAirport = function(destAirport) {
    AirportsSrv.setSelectedDestinationAirport(destAirport);
  };

  $scope.flipOtherAirlines = function() {
   AirportsSrv.setOtherAirlines($scope.details.otherAirlines);
  };

  $scope.$watch('details.departureDate', function() {
    // $scope.returnDate= null;
    // $scope.dateOptionsReturn.minDate = ($scope.departureDate==null)?
    // new Date(($scope.dateOptions.minDate.getTime())+(24*60*60*1000))
    // :new Date(($scope.departureDate.getTime())+(24*60*60*1000));
    // AirportsSrv.setSelectedDepartureDate($scope.departureDate);

  });

  AirportsSrv.setOtherAirlines("false");

  $scope.$watch('details.class', function() {
   if($scope.details.class=='1'){
     AirportsSrv.setSelectedClass("economy");
   }
   else{
     if($scope.details.class=='2'){
       AirportsSrv.setSelectedClass("business");
     }
   }
  });

  $scope.$watch('details.adultsCount', function() {
    AirportsSrv.setSelectedSeats(parseInt($scope.details.adultsCount)+parseInt($scope.details.childrenCount));
  });

  $scope.$watch('details.childrenCount', function() {
    AirportsSrv.setSelectedSeats(parseInt($scope.details.adultsCount)+parseInt($scope.details.childrenCount));
  });

})

 /* Two-Way-Controller*/
.controller('SearchflightCtrlTwoWay', function($scope,$state,AirportsSrv) {
  $scope.details = {
    "departureTime": "1",
    "returnTime":"1",
    "adultsCount":"1",
    "childrenCount":"0",
    "class":"1",
    "otherAirlines":false
  };
  AirportsSrv.setOtherAirlines("false");

  $scope.SetOriginAirport = function(originAirport) {
    AirportsSrv.setSelectedOriginAirport(originAirport);
  };

  /* Record User's Selected Destination Airport  */
  $scope.SetDestinationAirport = function(destAirport) {
    AirportsSrv.setSelectedDestinationAirport(destAirport);
  };

  $scope.flipOtherAirlines = function() {
   AirportsSrv.setOtherAirlines($scope.details.otherAirlines);
  };

  $scope.$watch('details.departureDate', function() {
    // $scope.returnDate= null;
    // $scope.dateOptionsReturn.minDate = ($scope.departureDate==null)?
    // new Date(($scope.dateOptions.minDate.getTime())+(24*60*60*1000))
    // :new Date(($scope.departureDate.getTime())+(24*60*60*1000));
    // AirportsSrv.setSelectedDepartureDate($scope.departureDate);

  });

  $scope.$watch('details.returnDate', function() {
    // if($scope.returnDate!=null && $scope.returnDate.getTime()<=$scope.departureDate.getTime())
    //  $scope.returnDate=null;
    // AirportsSrv.setSelectedReturnDate($scope.returnDate);
  });

  $scope.$watch('details.class', function() {
   if($scope.details.class=='1'){
     AirportsSrv.setSelectedClass("economy");
   }
   else{
     if($scope.details.class=='2'){
       AirportsSrv.setSelectedClass("business");
     }
   }
  });

  $scope.$watch('details.adultsCount', function() {
    AirportsSrv.setSelectedSeats(parseInt($scope.details.adultsCount)+parseInt($scope.details.childrenCount));
  });

  $scope.$watch('details.childrenCount', function() {
    AirportsSrv.setSelectedSeats(parseInt($scope.details.adultsCount)+parseInt($scope.details.childrenCount));
  });

})


//paymentController start
.controller('paymentController',function($scope,AirportsSrv,stripe){

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
          if(res.data.errorMessage==null){
            console.log("same airline case true"+$scope.class+"  ---  "+$scope.outgoingFlightID);
            $scope.refNum = res.data.refNum;
          }
          else {
            console.log("same airline case false");
          }
        });

      }
      else{
        AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.outgoingFlightID,null,paymentToken,$scope.outgoingFlightAirline,$scope.class).then(function(resOutgoing){
          console.log(resOutgoing.data.errorMessage);
          if(resOutgoing.data.errorMessage==null){
            console.log("different airlines outgoingFlight case true");
            $scope.refNum = resOutgoing.data.refNum;
          }
          else {
            console.log("different airlines outgoingFlight case false");

          }
          AirportsSrv.createBooking($scope.passengerDetails,$scope.cost,$scope.returnFlightID,null,paymentToken,$scope.returnFlightAirline,$scope.class).then(function(resReturn){
            console.log(resReturn.data.errorMessage);
            if(resReturn.data.errorMessage==null){
              console.log("different airlines returnFlight case true");
              $scope.refNum +="\n"+resReturn.data.refNum;
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
})
//paymentController end


/* directives */
.directive('ionicAutocomplete',
    function ($ionicPopover,AirportsSrv) {
        var popoverTemplate = 
         '<ion-popover-view style="margin-top:5px">' + 
             '<ion-content>' +
                 '<div class="list">' +
                    '<a class="item" ng-repeat="item in items"  ng-click="selectItem(item)">{{item}}</a>' +
                 '</div>' +
             '</ion-content>' +
         '</ion-popover-view>';
        return {
            restrict: 'A',
            scope: {
                params: '=ionicAutocomplete',
                inputSearch: '=ngModel'
            },
            link: function ($scope, $element, $attrs) {
              var popoverShown = false;
              var popover = null;
              if ($scope.params.items == undefined) {
                AirportsSrv.getAirportCodes().then(function (codes) {
                  $parent.codes = codes;
                  $scope.items = $scope.params.items;
                  //Add autocorrect="off" so the 'change' event is detected when user tap the keyboard
                  $element.attr('autocorrect', 'off');


                  popover = $ionicPopover.fromTemplate(popoverTemplate, {
                    scope: $scope
                  });
                  $element.on('click', function (e) {
                    if (!popoverShown) {
                      popover.show(e);
                    }

                  });

                  $scope.selectItem = function (item) {
                    $element.val(item);
                    popover.hide();
                  };
                });
              }
               
               
            }
        };
    }
)
.directive('showFlights',function(){
  return {
    restrict: 'E',
    scope: {
      flight:'=',
      type:'=',
      color: '=',
      index:'='
    },
    templateUrl: 'templates/showFlights.html'
  };
})

.directive('showPassengers',function(){
  return {
    restrict: 'E',
    scope: {
      countries: '=',
      index:'='
    },
    templateUrl: 'templates/showPassengers.html'
  };
})

.directive('bookingPassenger',function(){
  return {
    restrict: 'E',
    scope: {
      passenger:'=',
      index:'='
    },
    templateUrl: 'templates/bookingPassenger.html'
  };
});
