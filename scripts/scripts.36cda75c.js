"use strict";angular.module("ngQueensApp",["ngAnimate","ngCookies"]),angular.module("ngQueensApp").controller("MainController",function(){this.defaultGrid=4,this.currentGrid=4,this.gridSizes=[{name:"4x4",value:4},{name:"5x5",value:5},{name:"6x6",value:6},{name:"7x7",value:7},{name:"8x8",value:8}],this.createBoard=function(a){var b=0,c=angular.element("#board-container");c.children().remove(),this.currentGrid=a;for(var d=0;a>d;d++)for(var e=0;a>e;e++)d%2==0&&e%2!=0||d%2!=0&&e%2==0?c.append('<div class="tile-'+a+' black smoothfade" square-pos="'+d+e+'"></div>'):c.append('<div class="tile-'+a+' white smoothfade" square-pos="'+d+e+'"></div>'),b++;for(var d=0;a>d;d++)c.append('<img src="images/queen.3cf9eb09.png" class="queen-'+a+'" square-pos="Q'+d+'"/>')},this.moveQueen=function(){},this.createBoard(this.defaultGrid)}),angular.module("ngQueensApp").run(["$templateCache",function(a){a.put("views/main.html",'<div id="content" ng-controller="MainController as ctrl"> <div id="heading" class="row"> <h1 class="title">ngQueens</h1> </div> <div id="instructions" class="row"> Place all the queens on the board so that <br> no two queens threaten each other ! <button class="restart-button">New game</button> <div class="btn-group"> <button type="button" class="dropdown-toggle grid-button" data-toggle="dropdown"> Grid </button> <ul class="dropdown-menu"> <li><a ng-repeat="item in ctrl.gridSizes" ng-click="ctrl.createBoard(item.value)">{{ item.name }}</a></li> </ul> </div> </div> <div id="board-container"> </div> </div>')}]);