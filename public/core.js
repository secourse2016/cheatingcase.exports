var swissAir = angular.module('swissAir', ['ui.bootstrap', 'ngRoute']);

swissAir.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'mainController',
      templateUrl: 'views/home.html'
    })
    .when('/flights', {
      controller: 'flightsController',
      templateUrl: 'views/flights.html'
    })
    .when('/pay', {
      controller: 'payementController',
      templateUrl: 'views/payement.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
