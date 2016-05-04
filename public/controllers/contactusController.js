swissAir.controller('contactusController',function($scope,AirportsSrv){
    $scope.contactUs = function(){
AirportsSrv.contactus($scope.name,$scope.email,$scope.phone,$scope.message);
    }

});
