'use strict';

// Declare app level module which depends on views, and components
angular.module('virtualMath', [
        'ngRoute',
        'ngTouch',
        'virtualMath.assignment1',
        'virtualMath.assignment2',
        'virtualMath.help1',
        'virtualMath.help2',
        'virtualMath.compare',
        'virtualMath.version'
    ])

    // config
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/assignment1'});
    }])

    // general survey controller
    .controller('surveyController', function ($scope, $rootScope) {
        $rootScope.initialized = false;

        $scope.surveyData = {
            runs: [],
            currentRun: -1,
            lastScore: -1
        };

        $scope.getSurveyRunData = function () {
            return $scope.surveyData.runs;
        };

        $scope.getCurrentSurveyRunData = function () {
            if ($scope.surveyData.currentRun < 0) {
                $scope.startNewSurveyRun();
                $rootScope.initialized = true;
            }

            return $scope.surveyData.runs[$scope.surveyData.currentRun];
        };

        $scope.startNewSurveyRun = function () {
            $scope.surveyData.runs.push({
                score: -1
            });
            $scope.surveyData.currentRun++;
        };
        
        $scope.determineRunScore = function () {
            var data = $scope.getCurrentSurveyRunData();
            var assignment1Score = 0;
            if (data.assignment1 && data.assignment1.graphData && data.assignment1.graphData.analysis) {
                if (data.assignment1.graphData.analysis.result) {
                    assignment1Score = 1;
                }
            }
            var assignment2Score = 0;
            if (data.assignment2 && data.assignment2.graphData && data.assignment2.graphData.analysis) {
                if (data.assignment2.graphData.analysis.result) {
                    assignment2Score = 1;
                }
            }
            data.score = assignment1Score + assignment2Score;
        }
    })

    .run( function($rootScope, $location) {

        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if ( !$rootScope.initialized ) {
                if ( next.templateUrl != "/screens/assignment1/assignment1.html" ) {
                    $location.path( "/assignment1" );
                }
            }
        });
    });
