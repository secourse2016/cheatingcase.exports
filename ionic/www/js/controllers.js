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
         template: '<p style="font-family:Times New Roman">As Switzerland national airline, SWISS is committed to the highest standards of product and service quality. The airline flies some 16 million passengers every year to over 105 destinations all over the world.</p>',
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

.controller('ContactCtrl', function($scope, $ionicLoading, $ionicLoading,$timeout, $ionicScrollDelegate){

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
});




