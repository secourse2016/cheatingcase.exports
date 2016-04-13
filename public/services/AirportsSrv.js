/**
 * Airports Service
 */
swissAir.factory('AirportsSrv', function ($http) {
     return {
         getAirportCodes : function() {
           return $http.get('https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json');
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
           return this.selectedDepatureDate;
         },
         setSelectedDepartureDate: function(value){
           this.selectedDepatureDate=value;
         },
         getSelectedReturnDate: function(){
           return this.selectedReturnDate;
         },
         setSelectedReturnDate: function(value){
           this.selectedReturnDate=value;
         }
     };
 });
