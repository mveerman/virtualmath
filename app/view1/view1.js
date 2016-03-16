'use strict';

angular.module('myApp.view1', [
        'ngRoute',
        'myApp.vmath-function-input-directive'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', function ($scope) {
        $scope.description = {
            text: ''
        };



        //signaturePad = new SignaturePad(canvas);

    }]);