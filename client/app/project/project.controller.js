'use strict';

angular.module('hackLogicaApp').controller('ProjectCtrl', 
  function ($scope, Auth, $location, $window, $http, $state) {

  $scope.project = {};
  $scope.projectId = {};
	$scope.showStep = 1;
	$scope.showNextButton = false;
	$scope.transactionStep = 1;

  var initialTransactionWidth = '50%';

	$scope.transactionWidth = initialTransactionWidth;

  $scope.activateNextButton = function() {
    if ($scope.showNextButton === false) {
      $scope.showNextButton = true;
    } else {
      $scope.showNextButton = false;
    }
  };

  $scope.goToStep = function(step) {
    $scope.transactionStep = step;
    $scope.showStep = step;
    $scope.transactionWidth = parseInt(initialTransactionWidth) * step;
  };

  $scope.user = {};
  $scope.errors = {};

  $scope.register = function(form) {
    $scope.submitted = true;
    if(form.$valid) {
      $http.post('/api/projects', { 
        termsAndConditions: $scope.project.termsAndConditions || false,
        name: $scope.project.name,
        budget: $scope.project.budget,
        startTime: $scope.project.startTime,
        platforms: $scope.project.platforms,
        email: $scope.user.email,
        username: $scope.user.name
      }).then( function(response) {

        var projectId = response.data._id;

        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          projectId: projectId
        })
        .then( function() {
          // Account created, redirect to chat
          $state.go('chat', {id: projectId});
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }).catch( function(err) {
        err = err.data;
      });      
    }
  };

  $scope.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };
});
