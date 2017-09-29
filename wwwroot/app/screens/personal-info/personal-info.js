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

    .controller('PersonalInfoController', ['$scope', '$location', '$rootScope', '$document', function ($scope, $location, $rootScope, $document) {

        // see: http://devzone.co.in/simple-example-of-dependable-dropdowns-cascading-dropdowns-using-angularjs/
        // schooltype -> schoolyear -> wiskundetype
        // country -> state -> city

        $scope.wiskundes = {
            'VMBO':{
                '1':['Wiskunde'],
                '2':['Wiskunde'],
                '3':['Wiskunde'],
                '4':['Wiskunde']
            },
            'HAVO':{
                '1':['Wiskunde'],
                '2':['Wiskunde'],
                '3':['Wiskunde'],
                '4':['Wiskunde A', 'Wiskunde B'],
                '5':['Wiskunde A', 'Wiskunde B']
            },
            'VWO':{
                '1':['Wiskunde'],
                '2':['Wiskunde'],
                '3':['Wiskunde'],
                '4':['Wiskunde A', 'Wiskunde B', 'Wiskunde C'],
                '5':['Wiskunde A', 'Wiskunde B', 'Wiskunde C'],
                '6':['Wiskunde A', 'Wiskunde B', 'Wiskunde C']
            }
        };

        $scope.surveyController = $scope.$parent;

        $scope.student = $scope.surveyController.studentData;

        $scope.advanceToNextPage = function () {
            $scope.surveyController = $scope.$parent;

            var typeElement = $document[0].getElementById('studentSchoolType');
            var typeValue = typeElement.options[typeElement.selectedIndex].value;
            var typeText = typeElement.options[typeElement.selectedIndex].text;
            $scope.surveyController.studentData.schoolType = typeText;

            var yearElement = $document[0].getElementById('studentSchoolYear');
            var yearValue = yearElement.options[yearElement.selectedIndex].value;
            var yearText = yearElement.options[yearElement.selectedIndex].text;
            $scope.surveyController.studentData.schoolYear = yearText;

            $scope.surveyController.studentData.wiskundeType = $scope.wiskundetype;

            if (!$rootScope.initialized) {
                $scope.surveyController.startNewSurveyRun();
                $rootScope.initialized = true;
            }

            $location.path('/intro');
        };
    }]);