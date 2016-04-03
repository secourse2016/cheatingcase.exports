var swissAir = angular.module('swissAir', ['ui.bootstrap', 'ngRoute']);

swissAir.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'mainController',
      templateUrl: 'views/main.html'
    })
    .when('/flights', {
      controller: 'flightsController',
      templateUrl: 'views/flights.html'
    })
    .when('/pay', {
      controller: 'paymentController',
      templateUrl: 'views/payment.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
