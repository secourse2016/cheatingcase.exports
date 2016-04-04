var swissAir = angular.module('swissAir', ['ui.bootstrap', 'ngRoute']);

swissAir.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .when('/flights', {
      templateUrl: 'views/flights.html',
      controller: 'flightsController'
    })
    .when('/flights/pay', {
      templateUrl: 'views/payment.html',
      controller: 'paymentController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
