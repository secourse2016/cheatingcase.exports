var swissAir = angular.module('swissAir', ['ui.bootstrap','angular-stripe', 'ngRoute']);

swissAir.config(function ($routeProvider,stripeProvider) {

   stripeProvider.setPublishableKey('pk_test_0HCCWDzLKJrDq1i0QuB7yrXA');

  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .when('/flightsRoundTrip', {
      templateUrl: 'views/flightsRoundTrip.html',
      controller: 'flightsControllerRoundTrip'
    }).when('/flightsOneWay', {
      templateUrl: 'views/flightsOneWay.html',
      controller: 'flightsOneWayController'
    })
    .when('/flights/confirm', {
      templateUrl: 'views/confirmation.html',
      controller: 'confirmationController'
    })
    .when('/flights/pay', {
      templateUrl: 'views/payment.html',
      controller: 'paymentController'
    })
    .otherwise({
      redirectTo: '/'
    });

});
