'use strict';

angular.module('virtualMath.assignment1', [
        'ngRoute',
        'virtualMath.graph',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/assignment1', {
            templateUrl: 'screens/assignment1/assignment1.html',
            controller: 'Assignment1Controller'
        });
    }])

    .controller('Assignment1Controller', ['graphAnalyzer', '$scope', '$location', function (graphAnalyzer, $scope, $location) {
        graphAnalyzer.analysis= 'sphere';
        $scope.surveyController = $scope.$parent;
        $scope.surveyController.getCurrentSurveyRunData().assignment1 = {
            graphData: '',
            description: ''
        };
        $scope.description = '';
        $scope.graphData = '';

        $scope.saveGraph = function(graphData) {
            $scope.surveyController.getCurrentSurveyRunData().assignment1.graphData = graphData;
            $scope.graphData = graphData;
            $scope.surveyController.determineRunScore();
        };

        $scope.saveDescription = function() {
            $scope.surveyController.getCurrentSurveyRunData().assignment1.description = $scope.description;
        };

        $scope.advanceToNextPage = function() {
            $location.path('/assignment2');
        };

        $scope.functionInput = angular.module('virtualMath.vmath-function-input-directive');
    }]);