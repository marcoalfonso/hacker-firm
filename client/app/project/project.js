'use strict';

angular.module('hackLogicaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project', {
        url: '/project',
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
      });
  });