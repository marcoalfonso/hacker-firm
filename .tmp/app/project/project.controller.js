'use strict';

angular.module('hackLogicaApp').controller('ProjectCtrl', function ($scope) {
  $scope.showStep2 = false;
  $scope.showNextButton = false;
  $scope.transactionStep = 1;
  $scope.transactionWidth = '33%';
  $scope.activateNextButton = function () {
    if ($scope.showNextButton === false) {
      $scope.showNextButton = true;
    } else {
      $scope.showNextButton = false;
    }
  };
  $scope.activateNextStep = function () {
    $scope.showStep2 = true;
    $scope.transactionStep = 2;
    $scope.transactionWidth = '66%';
  };
  $scope.showStep1 = function () {
    $scope.showStep2 = false;
    $scope.transactionStep = 1;
    $scope.transactionWidth = '33%';
  };
});
//# sourceMappingURL=project.controller.js.map
