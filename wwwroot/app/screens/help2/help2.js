'use strict';

angular.module('virtualMath.help2', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/help2', {
            templateUrl: 'screens/help2/help2.html',
            controller: 'Help2Controller'
        });
    }])

    .controller('Help2Controller', ['$scope', '$location', function ($scope, $location) {
        $scope.advanceToNextPage = function() {
            $location.path('/compare');
        };
    }]);