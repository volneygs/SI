var app = angular.module("olyshot", []);

app.controller("olyshotController", function($scope){

  $scope.variavel = false;

  $scope.showMenu = function(){

    $scope.variavel = true;
  }


});
