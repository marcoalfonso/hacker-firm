'use strict';

angular.module('hackLogicaApp').config(function ($stateProvider) {
  $stateProvider.state('chat', {
    url: '/chat',
    templateUrl: 'app/chat/chat.html',
    controller: 'ChatCtrl'
  });
});
//# sourceMappingURL=chat.js.map
