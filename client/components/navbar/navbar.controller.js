'use strict';

angular.module('hackLogicaApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    /*$scope.notCollapse = function() {
      if ($scope.isCollapsed === true) {
        $scope.isCollapsed = false;
        $scope.navbarMargin = "navbarMargin";
      } else {
        $scope.isCollapsed = true;
        $scope.navbarMargin = "noNavbarMargin";
      }
      
    }*/
    
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });