'use strict';

describe('Controller: WorkCtrl', function () {

  // load the controller's module
  beforeEach(module('hackLogicaApp'));

  var WorkCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkCtrl = $controller('WorkCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
