'use strict';

angular.module('virtualMath.assignment1', [
        'ngRoute',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/assignment1', {
            templateUrl: 'screens/assignment1/assignment1.html',
            controller: 'Assignment1Ctrl'
        });
    }])

    .controller('Assignment1Ctrl', ['$scope', function ($scope) {
        $scope.description = {
            text: ''
        };

        $scope.saveGraph = function(graphData) {
            $scope.graphData = graphData;
        };

        $scope.functionInput = angular.module('virtualMath.vmath-function-input-directive');
    }]);