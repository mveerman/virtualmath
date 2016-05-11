'use strict';

angular.module('virtualMath.assignment2', [
        'ngRoute',
        'virtualMath.graph',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/assignment2', {
            templateUrl: 'screens/assignment2/assignment2.html',
            controller: 'Assignment2Controller'
        });
    }])

    .controller('Assignment2Controller', ['graphAnalyzer', '$scope', '$location', function (graphAnalyzer, $scope, $location) {
        graphAnalyzer.analysis = 'cylinder';
        $scope.surveyController = $scope.$parent;
        var data = $scope.surveyController.getCurrentSurveyRunData();
        if (data.assignment2 == null) {
            data.assignment2 = {
                graphData: null,
                description: ''
            };
        }
        $scope.description = data.assignment2.description;
        $scope.graphData = data.assignment2.graphData;

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