'use strict';

angular.module('virtualMath.intro', [
    'ngRoute'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/intro', {
            templateUrl: 'screens/intro/intro.html',
            controller: 'IntroController'
        });
    }])

    .controller('IntroController', ['$scope', '$location', function ($scope, $location) {

        $scope.advanceToNextPage = function () {
            $location.path('/assignment1');
        };
    }]);