angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MyCtrl', function($scope,$ionicSlideBoxDelegate,$location) {
   
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
   }
});



