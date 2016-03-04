'use strict';

angular.module('hackLogicaApp')
  .controller('ChatCtrl', function ($scope, $http, socket, $stateParams, User) {
    var currentId = $stateParams.id;

    $http.get('/api/projects/' + currentId).success(function(project) {
      $scope.project = project;
    });

    $scope.messages = [];
    $scope.userId = '';

    User.get( function(response){ 
      $scope.userName = response.name;
      $scope.userId = response._id;
    });

    $http.get('/api/messages/').success(function(messages) {
      $scope.messages = messages;
      socket.syncUpdates('message', $scope.messages);
    });

    $scope.addMessage = function() {
      if($scope.newMessage === '') {
        return;
      }
      $http.post('/api/messages', { message: $scope.newMessage, name: $scope.userName });
      $scope.newMessage = '';
    };

    $scope.deleteMessage = function(message) {
      $http.delete('/api/messages/' + message._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
