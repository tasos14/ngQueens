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
     vm.cols = new Array(vm.currentGrid);

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
        console.log(vm.cols);
        vm.newGame();
        localStorage.setItem('gridSize',gridSize);
      };

      vm.newGame = function(){
        var i,j;

        vm.cols = new Array(vm.currentGrid);

        // reset the table when grid changes
        for(i=1;i<vm.currentGrid+1;i++){
          for(j=1;j<vm.currentGrid+1;j++){
            angular.element('#'+i+j).empty();

            if(angular.element('#'+i+j).hasClass("red")){
              angular.element('#'+i+j).removeClass("red");
            }
          }
          vm.cols[i-1] = 0;
          angular.element('#Q'+i).removeClass("fade");
        }

        // for(i=1;i<vm.currentGrid+1;i++){
        //   row = vm.cols[i-1];
        //   angular.element('#'+row+i).empty();
        //   vm.cols[i-1] = 0;
        //   angular.element('#Q'+i).removeClass("fade");
        // }

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
        // get the clicked tile's id
        var id   = event.target.id;
        var row,col;

        if(id.length == 2){
          row = Number(id.charAt(0));
          col = Number(id.charAt(1));
        }
        else{
          row = Number(id.charAt(1));
          col = Number(id.charAt(2));
        }

        // when you click a tile for the first time on a column
        if(vm.cols[col-1] == 0){
          angular.element('#Q'+col).addClass("fade");
          angular.element('#'+id).append('<img src="images/queen.png" '+
                                    'class="queen-'+vm.currentGrid+'" id="Q'+id+'" />');
          vm.cols[col-1] = row;
          vm.drawRedBlocks(row,col);
          //localStorage.removeItem('cols');
          //localStorage.setItem('cols',vm.cols);
          console.log(vm.cols);
        }
        // when you click the tile whith a queen on it
        else if(vm.cols[col-1] == row) {
          angular.element('#'+vm.cols[col-1]+col).empty();
          angular.element('#Q'+col).removeClass('fade');
          vm.cols[col-1] = 0;
          vm.removeRedBlocks(row,col);
          //localStorage.removeItem('cols');
          //localStorage.setItem('cols',vm.cols);
          console.log(vm.cols);
        }
        // when you have already clicked a tile on that column
        else {
          angular.element('#'+vm.cols[col-1]+col).empty();
          angular.element('#'+id).append('<img src="images/queen.png" '+
                                    'class="queen-'+vm.currentGrid+'" id="Q'+id+'" />');
          var prev_row =vm.cols[col-1];
          vm.cols[col-1] = row;
          vm.removeRedBlocks(prev_row,col);
          //localStorage.removeItem('cols');
          //localStorage.setItem('cols',vm.cols);
          console.log(vm.cols);
        }
      };

      vm.drawRedBlocks = function(row,col){
        var i,j;
        var absDestance;

        for (i = 1; i<vm.currentGrid+1; i++) {
          absDestance = Math.abs(i-col);

          // draw the rows and cols
          angular.element('#'+row+i).addClass('red');
          angular.element('#'+i+col).addClass('red');

          for(j=1; j<vm.currentGrid+1; j++){
            // draw the diagonal
            if(j == row-absDestance || j == row+absDestance){
              angular.element('#'+j+i).addClass('red');
            }
          }
        }
        angular.element('#'+row+col).removeClass('red');
      };

      vm.removeRedBlocks = function(row,col){
        var i,j;
        var absDestance;

        // remove from rows and cols
        for(i = 1; i < vm.currentGrid+1; i++){
          absDestance = Math.abs(i-col);
          if(vm.cols[i-1] == 0){
            angular.element('#'+row+i).removeClass('red');
            angular.element('#'+i+col).removeClass('red');
          }
          // remove the diagonal
          for(j=1; j < vm.currentGrid+1; j++){
            angular.element('#'+j+i).removeClass('red');

          }
        }


        for (var i = 0; i < vm.currentGrid; i++) {
          if(vm.cols[i] != 0){
            vm.drawRedBlocks(vm.cols[i],i+1);
          }
        }
      };

      vm.onload = function(){
        //var cols = localStorage.getItem('cols').split();
        var grid = localStorage.getItem('gridSize');
        var i,row,col;

        if(grid != null){
          vm.changeGridSize(grid);

        }
      };

      console.log(vm.cols);
      angular.element(document).ready(vm.onload);


   });
