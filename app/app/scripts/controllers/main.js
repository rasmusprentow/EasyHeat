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
    $scope.house = 'lollandsgade9';
    $scope.room = 'living';
    var day = [];



    $http.get('http://localhost:3000/temperatures/' + $scope.house + '/' + $scope.room)
      .then(function (data)
      {

        console.log(data.data);


        $scope.days = data.data.days;

      }, function()
      {  $scope.days = [
          {name : 'weekday', hours : day},
          {name : 'friday', hours : day},
          {name : 'saturday',hours : day},
          {name : 'sunday',hours : day}

        ];

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
        var data = { house: $scope.house, room: $scope.room , days : $scope.days};
        $http.post('http://localhost:3000/temperatures', data);
      });



    $scope.update = function () {

        var data = { house: $scope.house, room: $scope.room , days : $scope.days};
        $http.put('http://localhost:3000/temperatures', data )
          .then(function (res) {
            console.log(res)
          }, function (res) {
            console.log(res)
          })

      };
  });
