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

     vm.moves;

     // a table to track where the user clicked
     // each element represents a column
     // example: vm.cols[1] = 3 -> there is a queen
     // in the third row of the first column
     vm.cols;
     vm.rows;
     vm.redBlocks;

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

     // helper function used by the board.html view to draw the board
     vm.getNumber = function(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
          arr.push(i);
        }
        return arr;
      };

      // changes gridSize, resets the board
      // initializes vm.cols,
      // localStorages gridSize
      vm.changeGridSize = function(gridSize){
        var i;
        vm.currentGrid = gridSize;

        vm.newGame();
        localStorage.setItem('gridSize',gridSize);
      };

      // resets board, vm.cols
      // localStorages vm.cols
      vm.newGame = function(){
        var i,j;

        vm.cols = new Array(vm.currentGrid);
        vm.rows = new Array(vm.currentGrid);
        vm.init_redBlocks(vm.currentGrid);

        // reset the table when grid changes
        for(i=0;i<vm.currentGrid;i++){
          vm.cols[i] = 0;
          vm.rows[i] = 0;
          for(j=0;j<vm.currentGrid;j++){
            vm.redBlocks[vm.currentGrid*i+j] = 0;
          }
        }

        vm.moves = 0;
        localStorage.setItem('moves',vm.moves);
        localStorage.setItem('cols',vm.cols);
        localStorage.setItem('rows',vm.rows);
      };

      vm.init_redBlocks = function(gridSize){
        var size = gridSize*gridSize;
        var i;
        vm.redBlocks = new Array(size);

        for(i=0;i<size;i++){
          vm.redBlocks[i] = 0;
        }
      };

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
          vm.cols[col-1] = row;
          vm.rows[row-1] = col;
          vm.moves++;

          vm.drawRedBlocks(row,col);

          localStorage.setItem('moves',vm.moves);
          localStorage.setItem('cols',vm.cols);
          localStorage.setItem('rows',vm.rows);
        }
        // when you click the tile whith a queen on it
        else if(vm.cols[col-1] == row) {
          vm.cols[col-1] = 0;
          vm.rows[row-1] = 0;
          vm.removeRedBlocks(row,col);
          vm.moves++;
          localStorage.setItem('moves',vm.moves);
          localStorage.setItem('cols',vm.cols);
          localStorage.setItem('rows',vm.rows);
        }
        // when you have already clicked a tile on that column
        else {
          var prev_row =vm.cols[col-1];
          //var prev_col =vm.rows[row-1];
          vm.cols[col-1] = row;
          vm.rows[row-1] = col;
          vm.removeRedBlocks(prev_row,col);
          vm.moves++;
          localStorage.setItem('moves',vm.moves);
          localStorage.setItem('cols',vm.cols);
          localStorage.setItem('rows',vm.rows);
        }
      };

      vm.drawRedBlocks = function(row,col){
        var i,j;
        var absDist;

        row--;
        col--;
        for(i=0;i<vm.currentGrid;i++){
          absDist = Math.abs(i-col);

          vm.redBlocks[vm.currentGrid*row+i] = 1;
          vm.redBlocks[vm.currentGrid*i+col] = 1;
          for(j=0;j<vm.currentGrid;j++){
            if(j == row-absDist || j == row+absDist){
              vm.redBlocks[vm.currentGrid*j+i] = 1;
            }
          }
        }
        vm.redBlocks[vm.currentGrid*row+col] = 0;
      };

      vm.removeRedBlocks = function(row,col){
        var i,j;

        row--;
        col--;
        for(i=0;i<vm.currentGrid;i++){

          if(vm.cols[i] == 0){
            vm.redBlocks[vm.currentGrid*row+i] = 0;
            vm.redBlocks[vm.currentGrid*i+col] = 0;
          }

          for(j=0;j<vm.currentGrid;j++){
            vm.redBlocks[vm.currentGrid*j+i] = 0;
          }
        }

        for(i=0;i<vm.currentGrid;i++){
          if(vm.cols[i] != 0){
            vm.drawRedBlocks(vm.cols[i],i+1);
          }
        }
      };

      // get localStorage grid and cols if exist.
      // update vm.currentGrid and vm.cols
      // draw the queens on the board
      vm.init = function(){
        var grid = Number(localStorage.getItem('gridSize'));
        var cols = localStorage.getItem('cols') != null? localStorage.getItem('cols').split(",",grid) : null;
        var rows = localStorage.getItem('rows') != null? localStorage.getItem('rows').split(",",grid) : null;
        var moves = Number(localStorage.getItem('moves'));
        var i,row,col,id;



        if(grid != null && cols != null && rows != null && moves != null){
          vm.currentGrid = grid;
          //vm.changeGridSize(grid);
          vm.init_redBlocks(vm.currentGrid);

          vm.moves = moves;

          vm.cols = new Array(grid);
          for(i=0;i<vm.cols.length;i++){
            vm.cols[i] = Number(cols[i]);

            // if not 0 draw the queen
            if(vm.cols[i] != 0){
              row = vm.cols[i]
              col = i+1;
              id  = String(row)+String(col);
              vm.drawRedBlocks(row,col);
            }
          }

          vm.rows = new Array(grid);
          for(i=0;i<vm.rows.length;i++){
            vm.rows[i] = Number(rows[i]);
            }

        }
        else {
          vm.currentGrid = 4;
          vm.newGame();

        }


      };

      vm.init();
   });
