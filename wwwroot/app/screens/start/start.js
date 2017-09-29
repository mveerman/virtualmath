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

        $scope.advanceToNextPage = function () {
            $location.path('/personal-info');
        };
    }]);