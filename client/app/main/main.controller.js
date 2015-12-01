'use strict';

angular.module('hackLogicaApp').controller('MainCtrl', function ($scope, $http, socket, $state) {
    $scope.projectStart = function(){
      $state.go('project');
    };

    $scope.myInterval = 5000;
    $scope.slides = [
      {
        image: 'assets/images/hero-illustration-1.svg'
      },
      {
        image: 'assets/images/hero-illustration-2.svg'
      },
      {
        image: 'assets/images/hero-illustration-3.svg'
      }
    ];
});
