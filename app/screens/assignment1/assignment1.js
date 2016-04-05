'use strict';

angular.module('virtualMath.assignment1', [
        'ngRoute',
        'virtualMath.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/assignment1', {
            templateUrl: 'screens/assignment1/assignment1.html',
            controller: 'Assignment1Ctrl'
        });
    }])

    .controller('Assignment1Ctrl', ['$scope', function ($scope) {
        $scope.surveyController = $scope.$parent;
        $scope.surveyController.getCurrentSurveyRunData().assignment1 = {
            graphData: '',
            description: ''
        };
        $scope.description = '';

        $scope.saveGraph = function(graphData) {
            $scope.surveyController.getCurrentSurveyRunData().assignment1.graphData = graphData;
        };

        $scope.saveDescription = function() {
            $scope.surveyController.getCurrentSurveyRunData().assignment1.description = $scope.description;
        };

        $scope.functionInput = angular.module('virtualMath.vmath-function-input-directive');
    }]);