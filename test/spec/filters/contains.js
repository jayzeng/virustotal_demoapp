'use strict';

describe('Filter: contains', function () {

  // load the filter's module
  beforeEach(module('DemoappApp'));

  // initialize a new instance of the filter before each test
  var contains;
  beforeEach(inject(function ($filter) {
    contains = $filter('contains');
  }));

  it('should return the input prefixed with "contains filter:"', function () {
    var text = 'angularjs';
    expect(contains(text)).toBe('contains filter: ' + text);
  });

});
