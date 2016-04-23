swissAir.directive('showFlights', function() {
  return {
    restrict: 'E',
    scope: {
      flight:'=',
      type:'=',
      color: '=',
      index:'='
    },
    templateUrl: 'directives/showFlights.html'
  };
});
