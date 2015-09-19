'use strict';

/**
 * @ngdoc function
 * @name ngQueensApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngQueensApp
 */
 angular.module('ngQueensApp')
   .controller('MainController', function () {

     this.defaultGrid = 4;
     this.currentGrid = 4;

     this.gridSizes = [{
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

     this.getNumber = function(num) {
          var arr = [];
          for (var i = 1; i <= num; i++) {
            arr.push(i);
          }
          return arr;
      };

     this.createBoard = function(gridSize) {
       var count = 0;
       var board = angular.element('#board-container');

       board.children().remove();
       this.currentGrid = gridSize;

       for(var i=0; i<gridSize; i++){
         for (var j=0; j < gridSize; j++) {

           if( ((i%2 == 0) && (j%2 !=0)) || ((i%2 !=0) && (j%2 == 0)) ){
             board.append('<div class="tile-'+gridSize+' black smoothfade" square-pos="'+i+j+'"></div>');
           }
           else {
             board.append('<div class="tile-'+gridSize+' white smoothfade" square-pos="'+i+j+'"></div>');
           }
           count++;
         }
       }

       for (var i = 0; i < gridSize; i++) {
         board.append('<img src="images/queen.png" class="queen-'+gridSize+'" square-pos="Q'+i+'"/>');
       }
     };

     this.moveQueen = function(){

     };







    //  this.createBoard(this.defaultGrid);
   });
