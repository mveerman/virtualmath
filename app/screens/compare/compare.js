'use strict';

angular.module('virtualMath.compare', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/compare', {
            templateUrl: 'screens/compare/compare.html',
            controller: 'CompareController'
        });
    }])

    .controller('CompareController', ['$scope', '$location', function ($scope, $location) {
        $scope.currentRunData = $scope.$parent.getCurrentSurveyRunData();
        $scope.lastScore = $scope.$parent.getLastScore();

        $scope.goto = function (page) {
            if (page === 'help1') {
                $scope.setHelp1Shown();
            }
            if (page === 'help2') {
                $scope.setHelp2Shown();
            }
            $location.path(page);
        };


        $scope.startNewRun = function () {
            $scope.$parent.startNewSurveyRun();
            $location.path('assignment1');
        }
    }]);