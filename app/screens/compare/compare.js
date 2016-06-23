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

    .controller('CompareController', ['$scope', '$location', '$http', function ($scope, $location, $http) {
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

            /*
            $.ajax({
                type: "POST",
                url: mgrsURL,
                data: args,
                dataType: "json",
                success: onSuccess,
                error: function() {
                    alert("Something went wrong!!!!");
                }
            });
            */

            var data = {
                userInfo: studentData,
                entryData: surveyData
            };

            var params = {
                eventName: "entry.store",
                returnValues: "result"
            };

            $http({
                method: 'POST',
                url: "../RemotingService.cfc?method=executeEvent&returnformat=json",
                data: data,
                params: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            ).success(function() {
                console.log('post successfull');
                onSucces();
            }).error(function(data, status, headers, config) {
                console.log(status + " " +  data);
            });

        };

        $scope.startNewRun = function () {
            $scope.$parent.startNewSurveyRun();
            $location.path('assignment1');
        }
    }]);