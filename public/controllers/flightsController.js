swissAir.controller('flightsController', function($scope,$location) {
  $scope.outgoingFlights = [

   {



          "flightNumber": "SE2804",
           "aircraft": "Airbus a388",
           "capacity": "100",
           "date": "Sun March 1 2016 19:54:57 GMT+0300 (EST)",
          "Duration": "2 hours",
            "origin": "Sharm Elsheikh Airport",
            "destination": "London International",
            "seatmap":
              [
                {
                	"cabin":"1",
                	"position":"window",
                	"cost":"50",
                	"id ":"VIW23Jfwq8vi3x0ef9",


                },
                 {
                	"cabin":"2",
                	"position":"aisle",
                	"cost":"50",
                	"id ":"VIW23Jfwq8vi3x0ee9",


                },
                 {
                	"cabin":"3",
                	"position":"aisle",
                	"cost":"50",
                	"id ":"VIW23Jfwq8vi3x01fe9",


                },
                 {
                	"cabin":"4",
                	"position":"aisle",
                	"cost":"60",
                	"id ":"VIW23Jfwq8vi3x013e9",


                },
                 {
                	"cabin":"5",
                	"position":"window",
                	"cost":"60",
                	"id ":"VIW23Jfwq8vi3x014e9",


                },

              ]

      },
      {



          "flightNumber": "SE2914",
           "aircraft": "Airbus a318",
           "capacity": "100",
           "date": "Sun March 29 2016 17:54:57 GMT+0300 (EST)",
          "Duration": "3 hours",
            "origin": "Brandenburg Airport",
            "destination": "King Khalid Airport",
            "seatmap":
              [
                {
                	"cabin":"1",
                	"position":"window",
                	"cost":"200",
                	"id ":"VIW23Jfwq9vi3x0ef9",


                },
                 {
                	"cabin":"2",
                	"position":"aisle",
                	"cost":"100",
                	"id ":"VIW23Jfwq9vi3x0ee8",


                },
                 {
                	"cabin":"3",
                	"position":"aisle",
                	"cost":"100",
                	"id ":"null",


                },
                 {
                	"cabin":"4",
                	"position":"aisle",
                	"cost":"100",
                	"id ":"VIW23Jfwq8vi3x023e9",


                },
                 {
                	"cabin":"5",
                	"position":"window",
                	"cost":"60",
                	"id ":"VIW23Jfwq8vi3x014e9",


                },

              ]

      },

        {



          "flightNumber": "SE2907",
           "aircraft": "Airbus a319",
           "capacity": "100",
           "date": "Sun March 29 2016 17:54:57 GMT+0300 (EST)",
          "Duration": "3 hours",
            "origin": "Netherlands",
            "destination": "King Khalid Airport",
            "seatmap":
              [
                {
                	"cabin":"1",
                	"position":"window",
                	"cost":"300",
                	"id ":"VIW23Jfwq9vi3x0ef9",


                },
                 {
                	"cabin":"2",
                	"position":"aisle",
                	"cost":"500",
                	"id ":"VIW23Jfwq9vi3x0ee8",


                },
                 {
                	"cabin":"3",
                	"position":"aisle",
                	"cost":"500",
                	"id ":"null",


                },
                 {
                	"cabin":"4",
                	"position":"aisle",
                	"cost":"500",
                	"id ":"VIW23Jfwq8vi3x023e9",


                },
                 {
                	"cabin":"5",
                	"position":"window",
                	"cost":"60",
                	"id ":"VIW23Jfwq8vi3x014e9",


                },

              ]
          }

        ];

  $scope.returnFlights = [ {



          "flightNumber": "SA2907",
           "aircraft": "Airbus a319",
           "capacity": "100",
           "date": "Sun March 2 2016 7:54:57 GMT+0300 (EST)",
          "Duration": "4 hours",
            "origin": "Netherlands",
            "destination": "King Khalid Airport",
            "seatmap":
              [
                {
                  "cabin":"1",
                  "position":"window",
                  "cost":"300",
                  "id ":"VIW23Jfwq9vi3x0ef9",


                },
                 {
                  "cabin":"2",
                  "position":"aisle",
                  "cost":"500",
                  "id ":"VIW23Jfwq9vi3x0ee8",


                },
                 {
                  "cabin":"3",
                  "position":"aisle",
                  "cost":"500",
                  "id ":"null",


                },
                 {
                  "cabin":"4",
                  "position":"aisle",
                  "cost":"500",
                  "id ":"VIW23Jfwq8vi3x023e9",


                },
                 {
                  "cabin":"5",
                  "position":"window",
                  "cost":"60",
                  "id ":"VIW23Jfwq8vi3x014e9",


                },

              ]
          },
          {



          "flightNumber": "SE29107",
           "aircraft": "Airbus a329",
           "capacity": "100",
           "date": "Sun March 3 2016 18:54:57 GMT+0300 (EST)",
          "Duration": "3 hours",
            "origin": "King Khalid Airport",
            "destination":"Netherlands",
            "seatmap":
              [
                {
                  "cabin":"1",
                  "position":"window",
                  "cost":"300",
                  "id ":"VIW23Jfwq9vi3x0ef9",


                },
                 {
                  "cabin":"2",
                  "position":"aisle",
                  "cost":"500",
                  "id ":"VIW23Jfwq9vi3x0ee8",


                },
                 {
                  "cabin":"3",
                  "position":"aisle",
                  "cost":"500",
                  "id ":"null",


                },
                 {
                  "cabin":"4",
                  "position":"aisle",
                  "cost":"500",
                  "id ":"VIW23Jfwq8vi3x023e9",


                },
                 {
                  "cabin":"5",
                  "position":"window",
                  "cost":"60",
                  "id ":"VIW23Jfwq8vi3x014e9",


                },

              ]
          }
  ];

  $scope.findType = function(flight){
    var i = $scope.outgoingFlights.length;
    while (i--) {
       if ($scope.outgoingFlights[i] === flight) {
           return "btn-info";
       }
    }
    return "btn-danger";
  };

  $scope.pay = function() {
    $location.url('/flights/pay');
  };


});
