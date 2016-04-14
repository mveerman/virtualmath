'use strict';

angular.module('virtualMath.start', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/start', {
            templateUrl: 'screens/start/start.html',
            controller: 'StartCtrl'
        });
    }])

    .controller('StartCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

        $scope.student = {
            name: '',
            level: ''
        };

        $scope.advanceToNextPage = function () {
            $scope.surveyController = $scope.$parent;
            if (!$rootScope.initialized) {
                $scope.surveyController.startNewSurveyRun();
                $rootScope.initialized = true;
            }
            $location.path('/assignment1');
        };
    }]);