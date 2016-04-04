swissAir.directive('showFlights', function() {
  return {
    restrict: 'E',
    scope: {
      flight:'=',
      type:'=',
      index:'='
    },
    templateUrl: 'directives/showFlights.html'
  };
});
