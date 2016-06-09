'use strict';

// Declare app level module which depends on views, and components
angular.module('virtualMath', [
        'ngRoute',
        'ngTouch',
        'virtualMath.start',
        'virtualMath.personalInfo',
        'virtualMath.intro',
        'virtualMath.assignment1',
        'virtualMath.assignment2',
        'virtualMath.help1',
        'virtualMath.help2',
        'virtualMath.compare',
        'virtualMath.feedback',
        'virtualMath.version',
        'jm.i18next'
    ])

    // config
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/start'});
    }])

    // general survey controller
    .controller('SurveyController', function ($scope, $rootScope) {
        $rootScope.initialized = false;

        $scope.studentData = {
            name: '',
            displayName: ''
        };

        $scope.surveyData = {
            runs: [],
            currentRun: -1,
            lastScore: -1,
            help1shown: false,
            help2shown: false
        };

        $scope.getSurveyRunData = function () {
            return $scope.surveyData.runs;
        };

        $scope.getCurrentSurveyRunData = function () {
            if ($scope.surveyData.currentRun < 0) {
                $scope.startNewSurveyRun();
            }

            return $scope.surveyData.runs[$scope.surveyData.currentRun];
        };

        $scope.startNewSurveyRun = function () {
            var score = -1;
            var assignment1Data = null;
            var assignment2Data = null;
            if ($scope.surveyData.currentRun >= 0) {
                var data = $scope.getCurrentSurveyRunData();
                $scope.surveyData.lastScore = data.score;
                score = data.score;
                assignment1Data = data.assignment1;
                assignment2Data = data.assignment2;
            }
            $scope.surveyData.runs.push({
                score: score,
                help1shown: false,
                help2shown: false,
                assignment1: assignment1Data,
                assignment2: assignment2Data
            });
            $scope.surveyData.currentRun++;
        };

        $scope.determineRunScore = function () {
            var data = $scope.getCurrentSurveyRunData();
            var assignment1Score = 0;
            if (data.assignment1 && data.assignment1.graphData && data.assignment1.graphData.analysis) {
                if (data.assignment1.graphData.analysis.result) {
                    assignment1Score = 1;
                }
            }
            var assignment2Score = 0;
            if (data.assignment2 && data.assignment2.graphData && data.assignment2.graphData.analysis) {
                if (data.assignment2.graphData.analysis.result) {
                    assignment2Score = 1;
                }
            }
            data.score = assignment1Score + assignment2Score;
        };

        $scope.getScore = function () {
            return $scope.getCurrentSurveyRunData().score;
        };

        $scope.getLastScore = function () {
            return $scope.surveyData.lastScore;
        };

        $scope.setHelp1Shown = function () {
            var data = $scope.getCurrentSurveyRunData();
            data.help1shown = true;
            $scope.surveyData.help1shown = true;
        };

        $scope.isHelp1Shown = function (inRun) {
            if (inRun) {
                return $scope.getCurrentSurveyRunData().help1shown;
            }
            return $scope.surveyData.help1shown;
        };

        $scope.setHelp2Shown = function () {
            var data = $scope.getCurrentSurveyRunData();
            data.help2shown = true;
            $scope.surveyData.help2shown = true;
        };

        $scope.isHelp2Shown = function (inRun) {
            if (inRun) {
                return $scope.getCurrentSurveyRunData().help2shown;
            }
            return $scope.surveyData.help2shown;
        };
    })

    .run(function ($rootScope, $location, $window, $i18next) {

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!$rootScope.initialized) {
                if (next.templateUrl != "screens/personal-info/personal-info.html") {
                    $location.path("/start");
                }
            }
        });

        // warn for data loss when reload is attempted
        $window.onbeforeunload = function (event) {
            event.preventDefault();
            return "Het opnieuw laden van de pagina zorgt ervoor dat alle ingevoerde gegevens verdwijnen.\n\nDeze actie wordt niet aangeraden!"
        };

        $i18next.options.lng = 'nl';

    });

angular.module('jm.i18next').config(
    ['$i18nextProvider', function ($i18nextProvider) {
        $i18nextProvider.options = {
            lng: 'nl', // If not given, i18n will detect the browser language.
            useCookie: true,
            useLocalStorage: false,
            fallbackLng: 'dev',
            resGetPath: 'locales/__lng__/translation.json',
            defaultLoadingValue: ''
        };

    }]
);