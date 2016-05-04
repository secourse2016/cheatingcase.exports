swissAir.controller('contactusController',function($scope,AirportsSrv){
    
AirportsSrv.contactus($scope.name,$scope.email,$scope.phone,$scope.message);

});
