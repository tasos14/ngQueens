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

     // a table to track where the user clicked
     vm.cols = [0,0,0,0];

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
        var i,j;
        // reset the table when grid changes
        for(i=0;i<vm.currentGrid;i++){
          for(j=0;j<vm.currentGrid;j++){
            angular.element('#'+i+j).empty();
          }
          vm.cols[i] = 0;
          angular.element('#Q'+i).removeClass("fade");
        }
      };

      $scope.$watch(
        function watchCurrentGrid(scope){
          return vm.currentGrid;
        },
        function handleGridChange(newValue, oldValue){

        }
      );

      vm.moveQueen = function(event){
        // get the clicked tile's id
        var id   = event.target.id;

        if(id.length == 2){
          var line = id.charAt(0);
          var col  = Number(id.charAt(1));
        }
        else{
          var line = id.charAt(1);
          var col  = Number(id.charAt(2));
        }

        // when you click a tile for the first time on a column
        if(vm.cols[col-1] == 0){
          angular.element('#Q'+col).addClass("fade");
          angular.element('#'+id).append('<img src="images/queen.png" '+
                                    'class="queen-'+vm.currentGrid+'" id="Q'+id+'" />');
          vm.cols[col-1] = line;
        }
        // when you click the tile whith a queen on it
        else if(vm.cols[col-1] == line) {
          angular.element('#'+vm.cols[col-1]+col).empty();
          angular.element('#Q'+col).removeClass('fade');
          vm.cols[col-1] = 0;
        }
        // when you have already clicked a tile on that column
        else {
          angular.element('#'+vm.cols[col-1]+col).empty();
          angular.element('#'+id).append('<img src="images/queen.png" '+
                                    'class="queen-'+vm.currentGrid+'" id="Q'+id+'" />');
          vm.cols[col-1] = line;
        }

      };

   });
