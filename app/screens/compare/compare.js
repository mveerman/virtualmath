'use strict';

angular.module('virtualMath.compare', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/compare', {
            templateUrl: 'screens/compare/compare.html',
            controller: 'CompareController'
        });
    }])

    .controller('CompareController', ['$scope', '$location', '$http', '$httpParamSerializerJQLike', function ($scope, $location, $http, $httpParamSerializerJQLike) {
        $scope.currentRunData = $scope.$parent.getCurrentSurveyRunData();
        $scope.surveyData = $scope.$parent.surveyData;
        $scope.studentData = $scope.$parent.studentData;

        $scope.lastScore = $scope.$parent.getLastScore();

        $scope.goto = function (page) {
            if (page === 'help1') {
                $scope.setHelp1Shown();
            }
            if (page === 'help2') {
                $scope.setHelp2Shown();
            }
            if (page === "feedback") {
                $scope.storeData($scope.studentData, $scope.surveyData, function() { //on success
                    $location.path(page);
                });
            } else {
                $location.path(page);
            }

        };

        $scope.storeData = function(studentData, surveyData, onSuccess) {


            var mgrsURL = "../RemotingService.cfc?method=executeEvent&returnformat=json";
            var args = {};
            args.eventName = "entry.store";
            args.returnValues = "result";

            //Various additional variables to pass with this request
            args.userInfo = angular.toJson(studentData);
            args.entryData = angular.toJson(surveyData);

            var data = {
                userInfo: angular.toJson(studentData),
                entryData: angular.toJson(surveyData)
            };

            var params = {
                eventName: "entry.store",
                returnValues: "result"
            };

            $http({
                method: 'POST',
                url: "../RemotingService.cfc?method=executeEvent&returnformat=json",
                data: $httpParamSerializerJQLike(data),
                params: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            ).success(function() {
                onSuccess();
            }).error(function(data, status, headers, config) {
                console.log(status + " " +  data);
                alert("Something went wrong. Please ask for assistance!!!!");
            });

        };

        $scope.startNewRun = function () {
            $scope.$parent.startNewSurveyRun();
            $location.path('assignment1');
        }
    }]);