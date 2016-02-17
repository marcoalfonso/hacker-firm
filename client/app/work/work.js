'use strict';

angular.module('hackLogicaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('work', {
        url: '/work',
        templateUrl: 'app/work/work.html',
        controller: 'WorkCtrl'
      });
  });