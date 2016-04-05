'use strict';

angular.module('virtualMath.assignment1', [
        'ngRoute',
        'graphModule',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/assignment1', {
            templateUrl: 'screens/assignment1/assignment1.html',
            controller: 'Assignment1Ctrl'
        });
    }])

    .controller('Assignment1Ctrl', ['graphAnalyzer', '$scope', '$location', function (graphAnalyzer, $scope, $location) {
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
        };

        $scope.saveDescription = function() {
            $scope.surveyController.getCurrentSurveyRunData().assignment1.description = $scope.description;
        };

        $scope.advanceToNextPage = function() {
            $location.path('/assignment2');
        };

        $scope.functionInput = angular.module('virtualMath.vmath-function-input-directive');
    }]);