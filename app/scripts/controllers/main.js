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
    for(var i = 0; i < 24; i++)
    {
      day[i] = {index: i, temperature: 20}
    }
    $scope.days = [
      {name : 'monday', hours : day},
      {name : 'tuesday', hours : day},
      {name : 'wedensday',hours : day},
      {name : 'thursday',hours : day},
      {name : 'friday',hours : day},
      {name : 'saturday',hours : day},
      {name : 'sunday',hours: day}


    ]
  });
