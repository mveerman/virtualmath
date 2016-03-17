'use strict';

angular.module('myApp.help1', [
        'ngRoute',
        'myApp.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/help1', {
            templateUrl: 'help1/help1.html',
            controller: 'Help1Ctrl'
        });
    }])

    .controller('Help1Ctrl', ['$scope', function ($scope) {
        $scope.description = {
            text: ''
        };
    }]);