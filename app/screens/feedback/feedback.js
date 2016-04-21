'use strict';

angular.module('virtualMath.feedback', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/feedback', {
            templateUrl: 'screens/feedback/feedback.html',
            controller: 'FeedbackController'
        });
    }])

    .controller('FeedbackController', ['$scope', '$location', function ($scope, $location) {

        $scope.surveyController = $scope.$parent;
        $scope.getScore = $scope.surveyController.getScore;
        $scope.isHelp1Shown = $scope.surveyController.isHelp1Shown;
        $scope.isHelp2Shown = $scope.surveyController.isHelp2Shown;
        $scope.hasRedo = function () {
            return $scope.surveyController.surveyData.length > 1;
        };
    }]);