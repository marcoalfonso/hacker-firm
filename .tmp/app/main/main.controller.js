'use strict';

angular.module('hackLogicaApp').controller('MainCtrl', function ($scope, $http, socket, $state) {
  $scope.awesomeThings = [];

  $http.get('/api/things').success(function (awesomeThings) {
    $scope.awesomeThings = awesomeThings;
    socket.syncUpdates('thing', $scope.awesomeThings);
  });

  $scope.addThing = function () {
    if ($scope.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: $scope.newThing });
    $scope.newThing = '';
  };

  $scope.deleteThing = function (thing) {
    $http['delete']('/api/things/' + thing._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('thing');
  });

  $scope.projectStart = function () {
    $state.go('project');
  };

  $scope.myInterval = 5000;
  $scope.slides = [{
    image: 'assets/images/hero-illustration-1.svg'
  }, {
    image: 'assets/images/hero-illustration-2.svg'
  }, {
    image: 'assets/images/hero-illustration-3.svg'
  }];
});
//# sourceMappingURL=main.controller.js.map
