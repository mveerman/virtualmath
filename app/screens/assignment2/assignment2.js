'use strict';

angular.module('virtualMath.assignment2', [
        'ngRoute',
        'graphModule',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/assignment2', {
            templateUrl: 'screens/assignment2/assignment2.html',
            controller: 'Assignment2Ctrl'
        });
    }])

    .controller('Assignment2Ctrl', ['graphAnalyzer', '$scope', '$location', function (graphAnalyzer, $scope, $location) {
        graphAnalyzer.analysis = 'cylinder';
        $scope.surveyController = $scope.$parent;
        $scope.surveyController.getCurrentSurveyRunData().assignment2 = {
            graphData: '',
            description: ''
        };
        $scope.description = '';
        $scope.graphData = '';

        $scope.saveGraph = function (graphData) {
            $scope.surveyController.getCurrentSurveyRunData().assignment2.graphData = graphData;
            $scope.graphData = graphData;
            $scope.surveyController.determineRunScore();
        };

        $scope.saveDescription = function () {
            $scope.surveyController.getCurrentSurveyRunData().assignment2.description = $scope.description;
        };

        $scope.advanceToNextPage = function() {
            if ($scope.surveyController.getCurrentSurveyRunData().score <= 0) {
                $scope.setHelp1Shown();
                $location.path('/help1');
            }else {
                $location.path('/compare');
            }
        };

        $scope.functionInput = angular.module('virtualMath.vmath-function-input-directive');
    }]);