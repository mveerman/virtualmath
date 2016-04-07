'use strict';

angular.module('virtualMath.help2', [
        'ngRoute',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/help2', {
            templateUrl: 'screens/help2/help2.html',
            controller: 'Help2Ctrl'
        });
    }])

    .controller('Help2Ctrl', ['$scope', '$location', function ($scope, $location) {
        $scope.advanceToNextPage = function() {
            $location.path('/compare');
        };
    }]);