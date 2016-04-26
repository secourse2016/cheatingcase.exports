swissAir.directive('showPassengers', function() {
  return {
    restrict: 'E',
    scope: {
      countries: '=',
      index:'='
    },
    templateUrl: 'directives/showPassengers.html'
  };
});
