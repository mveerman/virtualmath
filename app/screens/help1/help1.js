'use strict';

angular.module('virtualMath.help1', [
        'ngRoute',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/help1', {
            templateUrl: 'screens/help1/help1.html',
            controller: 'Help1Ctrl'
        });
    }])

    .controller('Help1Ctrl', ['$scope', '$location', function ($scope, $location) {
        $scope.advanceToNextPage = function() {
            $location.path('/compare');
        };
    }]);