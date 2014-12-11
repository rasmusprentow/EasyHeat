'use strict';

/**
 * @ngdoc function
 * @name easyHeatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easyHeatApp
 */
angular.module('easyHeatApp')
  .controller('MainCtrl', function ($scope) {
    $scope.bounds = [15, 27];
    var day = [];
    //$http.get('http:/localhost:3000/temperatures')
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

    //$scope.watch('days');
  });
