'use strict';

angular.module('virtualMath.compare', [
        'ngRoute',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/compare', {
            templateUrl: 'screens/compare/compare.html',
            controller: 'CompareCtrl'
        });
    }])

    .controller('CompareCtrl', ['$scope', function ($scope) {
        $scope.currentRunData = $scope.$parent.getCurrentSurveyRunData();
    }]);