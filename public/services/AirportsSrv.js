/**
 * Airports Service
 */
swissAir.factory('AirportsSrv', function ($http) {
     return {
         getAirportCodes : function() {
           return $http.get('/api/data/airports');
         },
         setSelectedOriginAirport: function(value) {
           this.selectedOriginAirport = value;
         },
         getSelectedOriginAirport: function() {
           return this.selectedOriginAirport;
         },
         setSelectedDestinationAirport: function(value) {
           this.selectedDestinationAirport = value;
         },
         getSelectedDestinationAirport: function() {
           return this.selectedDestinationAirport;
         },
         getSelectedDepartureDate: function(){
           return this.selectedDepartureDate;
         },
         setSelectedDepartureDate: function(value){
           this.selectedDepartureDate=value;
         },
         getSelectedReturnDate: function(){
           return this.selectedReturnDate;
         },
         setSelectedReturnDate: function(value){
           this.selectedReturnDate=value;
         },
         searchFlightsTwoWay: function(origin, destination, departingDate, returningDate, Class){
           return $http.get('/api/flights/search/:'+origin+'/:'+destination+'/:'+departingDate+'/:'+returningDate+'/:'+Class+'', {
     				"headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'},
     		   });
         },
         searchFlightsOneWay: function(origin, departureDate, Class){
           return $http.get('/api/flights/search/:'+origin+'/:'+departingDate+'/:'+Class+'', {
     				"headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'},
     		   });
         }
     };
 });
