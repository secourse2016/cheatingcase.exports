var swissAir = angular.module('swissAir', []);

swissAir.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'js/controllers/mainController.js',
      templateUrl: 'views/home.html'
    })
    .when('/flights', {
      controller: 'js/controllers/flightsController.js',
      templateUrl: 'views/flights.html'
    })
    .when('/pay', {
      controller: 'js/controllers/payementController.js',
      templateUrl: 'views/payement.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
