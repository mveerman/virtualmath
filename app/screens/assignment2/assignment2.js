'use strict';

angular.module('virtualMath.assignment2', [
        'ngRoute',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/assignment2', {
            templateUrl: 'screens/assignment2/assignment2.html',
            controller: 'Assignment2Ctrl'
        });
    }])

    .controller('Assignment2Ctrl', ['$scope', function ($scope) {
        $scope.description = {
            text: ''
        };
    }]);