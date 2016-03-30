'use strict';

// Declare app level module which depends on views, and components
angular.module('virtualMath', [
    'ngRoute',
    'virtualMath.assignment1',
    'virtualMath.assignment2',
    'virtualMath.help1',
    'virtualMath.compare',
    'virtualMath.version'

]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/assignment1'});
}]);
