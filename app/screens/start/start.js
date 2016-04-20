'use strict';

angular.module('virtualMath.start', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/start', {
            templateUrl: 'screens/start/start.html',
            controller: 'StartController'
        });
    }])

    .controller('StartController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

        $scope.surveyController = $scope.$parent;

        $scope.student = $scope.surveyController.studentData;

        $scope.advanceToNextPage = function () {
            $scope.surveyController = $scope.$parent;
            if (!$rootScope.initialized) {
                $scope.surveyController.startNewSurveyRun();
                $rootScope.initialized = true;
            }

            // set student info to surveyController
            $scope.surveyController.studentData.name = $scope.student.name;

            $location.path('/assignment1');
        };
    }]);