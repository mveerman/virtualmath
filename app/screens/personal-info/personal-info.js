'use strict';

angular.module('virtualMath.personalInfo', [
    'ngRoute'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/personal-info', {
            templateUrl: 'screens/personal-info/personal-info.html',
            controller: 'PersonalInfoController'
        });
    }])

    .controller('PersonalInfoController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

        $scope.surveyController = $scope.$parent;

        $scope.student = $scope.surveyController.studentData;

        $scope.advanceToNextPage = function () {
            $scope.surveyController = $scope.$parent;
            if (!$rootScope.initialized) {
                $scope.surveyController.startNewSurveyRun();
                $rootScope.initialized = true;
            }

            $location.path('/assignment1');
        };
    }]);