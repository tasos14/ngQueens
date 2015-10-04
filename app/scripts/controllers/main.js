'use strict';

/**
 * @ngdoc function
 * @name ngQueensApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngQueensApp
 */
 angular.module('ngQueensApp')
   .controller('MainController', function ($scope) {

     var vm = this;

     vm.currentGrid = 4;

     vm.gridSizes = [{
       name: "4x4",
       value: 4
     }, {
       name: "5x5",
       value: 5
     }, {
       name: "6x6",
       value: 6
     }, {
       name: "7x7",
       value: 7
     }, {
       name: "8x8",
       value: 8
     }];

     vm.getNumber = function(num) {
          var arr = [];
          for (var i = 1; i <= num; i++) {
            arr.push(i);
          }
          return arr;
      };

      vm.changeGridSize = function(gridSize){
        vm.currentGrid = gridSize;
      };

      $scope.$watch(
        function watchCurrentGrid(scope){
          return vm.currentGrid;
        },
        function handleGridChange(newValue, oldValue){

        }
      );
   });
