swissAir.directive('bookingPassenger', function() {
  return {
    restrict: 'E',
    scope: {
      passenger:'=',
      index:'='
    },
    templateUrl: 'directives/bookingPassenger.html'
  };
});
