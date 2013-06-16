'use strict';

angular.module('DemoappApp')
  .filter('contains', function () {
    return function (input, searchTerm) {
      var result = {};
      angular.forEach(input, function(key, val) {
          if( val.toLowerCase().search(searchTerm) !== -1 ||
              key.result.search(searchTerm) !== -1) {
            result[val] = key;
          }
      });

      return result;
    };
  });
