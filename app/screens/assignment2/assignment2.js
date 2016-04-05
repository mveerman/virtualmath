'use strict';

angular.module('virtualMath.assignment2', [
        'ngRoute',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/assignment2', {
            templateUrl: 'screens/assignment2/assignment2.html',
            controller: 'Assignment2Ctrl'
        });
    }])

    .controller('Assignment2Ctrl', ['$scope', function ($scope) {
        $scope.surveyController = $scope.$parent;
        $scope.surveyController.getCurrentSurveyRunData().assignment2 = {
            graphData: '',
            description: ''
        };
        $scope.description = '';

        $scope.saveGraph = function(graphData) {
            $scope.surveyController.getCurrentSurveyRunData().assignment2.graphData = graphData;
        };

        $scope.saveDescription = function() {
            $scope.surveyController.getCurrentSurveyRunData().assignment2.description = $scope.description;
        };

        $scope.functionInput = angular.module('virtualMath.vmath-function-input-directive');
    }]);