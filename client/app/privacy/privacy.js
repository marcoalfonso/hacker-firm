'use strict';

angular.module('hackLogicaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('privacy', {
        url: '/privacy',
        templateUrl: 'app/privacy/privacy.html',
        controller: 'PrivacyCtrl'
      });
  });