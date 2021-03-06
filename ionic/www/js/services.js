angular.module('starter.services', [])

.factory('AirportsSrv', function($http) {
  return {
    setPassengerArray: function(value) {
      this.passengerArray = value;
    },
    getPassengerArray: function() {
      return this.passengerArray;
    },

    setOutgoingFlights: function(value) {
      this.outgoingFlights = value;
    },
    getOutgoingFlights: function() {
      return this.outgoingFlights;
    },

    setReturnFlights: function(value) {
      this.returnFlights = value;
    },
    getReturnFlights: function() {
      return this.returnFlights;
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


    getOtherAirlines: function(){
      return this.otherAirlines;
    },
    setOtherAirlines: function(value){
      this.otherAirlines=value;
    },

    getSelectedSeats: function(){
      return this.selectedSeats;
    },
    setSelectedSeats: function(value){
      this.selectedSeats=value;
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

    getSelectedClass: function(){
      return this.selectedClass;
    },
    setSelectedClass: function(value){
      this.selectedClass=value;
    },


    getOutgoingFlightID: function(){
      return this.outgoingFlightID;
    },
    setOutgoingFlightID: function(value){
      this.outgoingFlightID=value;
    },

    getOutgoingFlightAirline: function(){
      return this.outgoingFlightAirline;
    },
    setOutgoingFlightAirline: function(value){
      this.outgoingFlightAirline=value;
    },

    getReturnFlightID: function(){
      return this.returnFlightID;
    },
    setReturnFlightID: function(value){
      this.returnFlightID=value;
    },

    getReturnFlightAirline: function(){
      return this.returnFlightAirline;
    },
    setReturnFlightAirline: function(value){
      this.returnFlightAirline=value;
    },

    getCost: function(){
      return this.cost;
    },
    setCost: function(value){
      this.cost=value;
    },
    getbookingRefNum : function() {
      return this.bookingRefNum;
    },

    setbookingRefNum: function(value) {
      this.bookingRefNum = value;
    },

    setViewedBooking: function(value) {
      this.viewedBooking = value;
    },

    getViewedBooking: function() {
      return this.viewedBooking;
    },

    formatDate: function (date) {
      month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    },

    getAirportCodes : function() {
      return $http.get('http://www.swiss-air.me/api/data/airports');
    },

    searchFlightsTwoWay: function(origin, destination, departingDate, returningDate, Class, otherAirlines,seats){
      return $http.get('http://www.swiss-air.me/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+Class+'/'+seats+''+'?oa='+otherAirlines, {
        "headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'}
      });
    },
    searchFlightsOneWay: function(origin, destination, departingDate, Class, otherAirlines,seats){
      return $http.get('http://www.swiss-air.me/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+Class+'/'+seats+'?oa='+otherAirlines, {
        "headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'}
      });
    },
    getAirlineDetails: function(airline){
      return $http.get('http://www.swiss-air.me/airlinedetails?airline='+airline, {
        "headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'}
      });
    },
    createBooking: function(passengerDetails,cost,outgoingFlightId,returnFlightId,paymentToken,otherAirline,Class){
      var data = {
        "passengerDetails": passengerDetails,
        "cost": cost,
        "class": Class,
        "outgoingFlightId": outgoingFlightId,
        "returnFlightId": returnFlightId,
        "paymentToken" : paymentToken.id
      };
      var path = 'http://www.swiss-air.me/bookingOthers?airline='+otherAirline;
      if(otherAirline=="Swiss Air"){
         path = 'http://www.swiss-air.me/booking' ;
      }
      return $http.post(path,data, {
        "headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'}
      });
    },
    viewBooking: function(refNum){
      return $http.get('http://www.swiss-air.me/viewbooking/'+refNum, {
        "headers" : { 'x-access-token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzd2lzc0FpciIsImlhdCI6MTQ2MDYzMDIxMSwiZXhwIjoxNDkyMTY2MjE0LCJhdWQiOiJ3d3cuc3dpc3MtYWlyLm1lIiwic3ViIjoic3dpc3NBaXIgQ2xpZW50Iiwic3dpc3NBaXJVc2VyIjoic3dpc3NBaXJBbmd1bGFyIn0.GxAzq5SdDt8wB-2eqKBhaLAAHoCQ8Lw51yL2qRYbJvM'}
      });
    },
    getConcatFlightsTwoWay:function(origin, destination, departingDate, returningDate, Class, otherAirlines,seats,cb){
      this.searchFlightsTwoWay(origin, destination, departingDate, returningDate, Class, otherAirlines,seats)
      .success(function(flights){
        var outgoingFlights=flights.outgoingFlights;
        var returnFlights =flights.returnFlights;
        for(var i=0;i<outgoingFlights.length;i++){
          outgoingFlights[i].checked=false;
        }


        for(var j=0; j<returnFlights.length;j++)
        returnFlights[j].checked=false;

        var  result = {
          "outgoingFlights"  : outgoingFlights,
          "returnFlights"    : returnFlights
        };
        cb(result);
      });
    },
    getConcatFlightsOneWay:function(origin, destination, departingDate, Class, otherAirlines,seats,cb){
      this.searchFlightsOneWay(origin, destination, departingDate, Class, otherAirlines,seats)
      .success(function(flights){
        var outgoingFlights=flights.outgoingFlights;
        for(var i=0;i<outgoingFlights.length;i++){
          outgoingFlights[i].checked=false;
        }

        var  result = {
          "outgoingFlights"  : outgoingFlights
        };
        cb(result);
      });
    }
  };
});
