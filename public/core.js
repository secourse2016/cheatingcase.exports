var swissAir = angular.module('swissAir', ['ui.bootstrap', 'ngRoute']);

swissAir.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .when('/flightsRoundTrip', {
      templateUrl: 'views/flightsRoundTrip.html',
      controller: 'flightsControllerRoundTrip'
    })
    .when('/flights/pay', {
      templateUrl: 'views/payment.html',
      controller: 'paymentController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
