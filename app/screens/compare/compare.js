'use strict';

angular.module('virtualMath.compare', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/compare', {
            templateUrl: 'screens/compare/compare.html',
            controller: 'CompareCtrl'
        });
    }])

    .controller('CompareCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.currentRunData = $scope.$parent.getCurrentSurveyRunData();
        $scope.lastScore = $scope.$parent.getLastScore();

        $scope.goto = function(page) {
            $location.path(page);
        };
        
        $scope.startNewRun = function() {
            $scope.$parent.startNewSurveyRun();
            $location.path('assignment1');
        }
    }]);