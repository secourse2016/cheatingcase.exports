angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MyCtrl', function($scope, $ionicPopup, $ionicSlideBoxDelegate) {

   // When button is clicked, the popup will be shown...
  
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
   }
})

