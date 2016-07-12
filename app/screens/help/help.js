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

    }]);