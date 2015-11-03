'use strict';

angular.module('hackLogicaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat/:id',
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl',
        params: {
        	id: ''
        }
      });
  });