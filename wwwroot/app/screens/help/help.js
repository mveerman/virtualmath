'use strict';

angular.module('virtualMath.help', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/help', {
            templateUrl: 'screens/help/help.html',
            controller: 'HelpController'
        });
    }])

    .controller('HelpController', ['$scope', '$location', function ($scope, $location) {

        $scope.advanceToNextPage = function () {
            $location.path('/compare');
        };

        $scope.help1Clicked = function () {
            $scope.setHelp1Shown();
        };

        $scope.help2Clicked = function () {
            $scope.setHelp2Shown();
        };

    }]);