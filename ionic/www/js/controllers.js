angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MyCtrl', function($scope,$ionicSlideBoxDelegate,$location) {
    $scope.flights = function(){
    	$location.url('/main');
    }
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
   }
});



