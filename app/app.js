'use strict';

// Declare app level module which depends on views, and components
angular.module('virtualMath', [
        'ngRoute',
        'ngTouch',
        'virtualMath.assignment1',
        'virtualMath.assignment2',
        'virtualMath.help1',
        'virtualMath.compare',
        'virtualMath.version'
    ])

    // config
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/assignment1'});
    }])

    // general survey controller
    .controller('surveyController', function ($scope) {
        $scope.surveyData = {
            runs: [{
                score: -1
            }],
            currentRun: 0,
            lastScore: -1
        };

        $scope.getSurveyRunData = function() {
            return $scope.surveyData.runs;
        };

        $scope.getCurrentSurveyRunData = function() {
            if ($scope.surveyData.runs.length > $scope.surveyData.currentRun) {
                return $scope.surveyData.runs[$scope.surveyData.currentRun];
            }
        };

        $scope.startNewSurveyRun = function() {
            $scope.surveyData.runs.push({
                score: -1
            });
            $scope.surveyData.currentRun++;
        };
    });
