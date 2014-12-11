'use strict';

/**
 * @ngdoc function
 * @name easyHeatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easyHeatApp
 */
angular.module('easyHeatApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.bounds = [15, 27];
    var day = [];



    $http.get('http://localhost:3000/temperatures/friday')
      .then(function (data)
      {

        console.log(data.data);
      //  $scope.days[1].hours = data.data.hours;

        $scope.days = [
          {name : 'weekday', hours : data.data.hours},
          {name : 'friday', hours : data.data.hours},
          {name : 'saturday',hours : data.data.hours},
          {name : 'sunday',hours : data.data.hours}

        ]
      }, function()
      {
        $scope.days = [
          {name : 'weekday', hours : day},
          {name : 'friday', hours : day},
          {name : 'saturday',hours : day},
          {name : 'sunday',hours : day}

        ]

        $scope.days.forEach(function(item)
        {
          var day = [];
          for(var i = 0; i < 24; i++)
          {
            day[i] = {index: i, temperature: 20}
          }
          item.hours = day;
        });
        console.log("Creating new")
        $http.post('http://localhost:3000/temperatures/', $scope.days[1]);
      });



    $scope.update = function () {
        console.log("ddd")
        $http.put('http://localhost:3000/temperatures/friday',$scope.days[1])
          .then(function (res) {
            console.log(res)
          }, function (res) {
            console.log(res)
          })

      };
  });
