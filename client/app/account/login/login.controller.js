'use strict';

angular.module('hackLogicaApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, User) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to chat
          User.get( function(response){
            var userProjectId = response.projectId;
            $location.path('/chat/' + userProjectId);
          });          
          
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
