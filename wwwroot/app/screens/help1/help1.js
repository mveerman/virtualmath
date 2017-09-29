'use strict';

angular.module('virtualMath.help1', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/help1', {
            templateUrl: 'screens/help1/help1.html',
            controller: 'Help1Controller'
        });
    }])

    .controller('Help1Controller', ['$scope', '$location', function ($scope, $location) {
        $scope.advanceToNextPage = function() {
            $location.path('/compare');
        };
    }]);