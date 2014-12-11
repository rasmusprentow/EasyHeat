'use strict';

describe('Directive: tempControl', function () {

  // load the directive's module
  beforeEach(module('easyHeatApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<temp-control></temp-control>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tempControl directive');
  }));
});
