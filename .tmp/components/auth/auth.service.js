'use strict';

angular.module('hackLogicaApp').factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
  var currentUser = {};
  if ($cookieStore.get('token')) {
    currentUser = User.get();
  }

  return {

    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    login: function login(user, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: user.email,
        password: user.password
      }).success(function (data) {
        $cookieStore.put('token', data.token);
        currentUser = User.get();
        deferred.resolve(data);
        return cb();
      }).error((function (err) {
        this.logout();
        deferred.reject(err);
        return cb(err);
      }).bind(this));

      return deferred.promise;
    },

    /**
     * Delete access token and user info
     *
     * @param  {Function}
     */
    logout: function logout() {
      $cookieStore.remove('token');
      currentUser = {};
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    createUser: function createUser(user, callback) {
      var cb = callback || angular.noop;

      return User.save(user, function (data) {
        $cookieStore.put('token', data.token);
        currentUser = User.get();
        return cb(user);
      }, (function (err) {
        this.logout();
        return cb(err);
      }).bind(this)).$promise;
    },

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - optional
     * @return {Promise}
     */
    changePassword: function changePassword(oldPassword, newPassword, callback) {
      var cb = callback || angular.noop;

      return User.changePassword({ id: currentUser._id }, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function (user) {
        return cb(user);
      }, function (err) {
        return cb(err);
      }).$promise;
    },

    /**
     * Gets all available info on authenticated user
     *
     * @return {Object} user
     */
    getCurrentUser: function getCurrentUser() {
      return currentUser;
    },

    /**
     * Check if a user is logged in
     *
     * @return {Boolean}
     */
    isLoggedIn: function isLoggedIn() {
      return currentUser.hasOwnProperty('role');
    },

    /**
     * Waits for currentUser to resolve before checking if user is logged in
     */
    isLoggedInAsync: function isLoggedInAsync(cb) {
      if (currentUser.hasOwnProperty('$promise')) {
        currentUser.$promise.then(function () {
          cb(true);
        })['catch'](function () {
          cb(false);
        });
      } else if (currentUser.hasOwnProperty('role')) {
        cb(true);
      } else {
        cb(false);
      }
    },

    /**
     * Check if a user is an admin
     *
     * @return {Boolean}
     */
    isAdmin: function isAdmin() {
      return currentUser.role === 'admin';
    },

    /**
     * Get auth token
     */
    getToken: function getToken() {
      return $cookieStore.get('token');
    }
  };
});
//# sourceMappingURL=auth.service.js.map
