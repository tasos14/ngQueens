angular.module('ngQueensApp')
  .directive('board', function(){
    return{
      restrict: 'E',
      templateUrl: 'views/board.html'
    }
  });
