'use strict';

angular.module('virtualMath.feedback', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/feedback', {
            templateUrl: 'screens/feedback/feedback.html',
            controller: 'FeedbackCtrl'
        });
    }])

    .controller('FeedbackCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.advanceToNextPage = function() {
            $location.path('/compare');
        };
    }]);