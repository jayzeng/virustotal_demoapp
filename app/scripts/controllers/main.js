'use strict';

angular.module('DemoappApp')
  .controller('MainCtrl', function ($scope, $http) {

    var cacheResponses = {};
    $scope.validateUrl = function() {
        var scanurl = 'http://localhost/DemoApp/server/Api/scanurl.php?callback=JSON_CALLBACK';

        if(cacheResponses[$scope.url]) {
            console.log('hitting local cache');
            $scope.data = cacheResponses[$scope.url];
            return;
        }

        $http({method: 'jsonp', params: {'url':$scope.url}, url: scanurl}).
             success(function(data) {
                 $scope.data = data;
                 cacheResponses[$scope.url] = data;
             });
    };
  });
