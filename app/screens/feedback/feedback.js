'use strict';

angular.module('virtualMath.feedback', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/feedback', {
            templateUrl: 'screens/feedback/feedback.html',
            controller: 'FeedbackController'
        });
    }])

    .controller('FeedbackController', ['$scope', '$document', function ($scope, $document) {

        $scope.surveyController = $scope.$parent;
        $scope.getScore = $scope.surveyController.getScore;
        $scope.isHelp1Shown = $scope.surveyController.isHelp1Shown;
        $scope.isHelp2Shown = $scope.surveyController.isHelp2Shown;
        $scope.hasRedo = function () {
            return $scope.surveyController.surveyData.length > 1;
        };

        $scope.currentRunData = $scope.$parent.getCurrentSurveyRunData();

        $scope.runReward = function () {
            // console.log("run reward");
            var rewardCanvasA = $scope.getRewardCanvas('REWARD_ASSIGNMENT_A');
            var rewardDataA = JSON.parse($scope.currentRunData.assignment1.graphData.pathAsJson);
            $scope.buildVase(rewardCanvasA, rewardDataA);

            var rewardCanvasB = $scope.getRewardCanvas('REWARD_ASSIGNMENT_B');
            var rewardDataB = JSON.parse($scope.currentRunData.assignment2.graphData.pathAsJson);
            $scope.buildVase(rewardCanvasB, rewardDataB);
        };

        $scope.getRewardCanvas = function (id) {
            var canvasArray = $document.find('canvas');
            var rewardCanvas = null;
            for (var i = 0; i < canvasArray.length; i++) {
                if (canvasArray[i].id === id) {
                    rewardCanvas = canvasArray[i];
                    break;
                }
            }
            return rewardCanvas;
        };

        $scope.buildVase = function (canvas, data) {
            paper.setup(canvas);

            var minX = null;
            var maxX = null;
            var minY = null;
            var maxY = null;

            for (var i = 0; i < data[1].segments.length; i++) {
                var pointX = data[1].segments[i][0][0];
                var pointY = data[1].segments[i][0][1];
                if (minX == null || pointX < minX) {
                    minX = pointX;
                }
                if (maxX == null || pointX > minX) {
                    maxX = pointX;
                }
                if (minY == null || pointY < minY) {
                    minY = pointY;
                }
                if (maxY == null || pointY > maxY) {
                    maxY = pointY;
                }
            }

            var inhoud = Math.PI * Math.pow((canvas.scrollWidth / 4), 2) * canvas.scrollHeight;
            var xPerc = inhoud / (maxX - minX);

            var tY = (canvas.scrollHeight - 2) / (maxY - minY);

            var middle = new paper.Path();
            middle.add(new Point(canvas.scrollWidth / 2, 0));
            middle.add(new Point(canvas.scrollWidth / 2, canvas.scrollHeight));
            middle.strokeColor = '#efefef';
            middle.dashArray = [6, 3];

            var original = new paper.Path();
            original.importJSON(data);
            original.strokeColor = '#FF6330';
            original.dashArray = [6, 2];
            original.closed = false;
            original.fullySelected = false;
            original.reduce();

            var vaseLeft = new paper.Path();
            vaseLeft.strokeColor = 'black';
            vaseLeft.strokeWidth = 2;
            vaseLeft.fullySelected = false;
            vaseLeft.add(new Point(canvas.scrollWidth / 2, canvas.scrollHeight - 1));

            var vaseRight = new paper.Path();
            vaseRight.strokeColor = 'black';
            vaseRight.strokeWidth = 2;
            vaseRight.fullySelected = false;
            vaseRight.add(new Point(canvas.scrollWidth / 2, canvas.scrollHeight - 1));

            var prevPoint = null;
            var prevDrawPoint = null;

            var subTotal = 0;

            for (var x = 0; x < original.length; x = x + 20) {
                var curPoint = original.getPointAt(x);
                var angle = 0;
                var multiplier = 0;
                if (prevPoint != null) {
                    angle = Math.atan2(prevPoint.y - curPoint.y, curPoint.x - prevPoint.x) * 180 / Math.PI;
                    multiplier = (90 - angle) / 45;
                }
                if (angle >= 0 && multiplier <= 2 && multiplier >= 0) {
                    var newHeight = curPoint.y;
                    if (prevPoint != null) {
                        newHeight = prevPoint.y;
                    }

                    var heightD = 0;
                    var straal = 0;
                    var subInhoud = 0;
                    if (prevPoint != null) {
                        heightD = prevPoint.y - curPoint.y;
                        subInhoud = ((curPoint.x - minX) * xPerc) - subTotal;
                        straal = Math.sqrt(subInhoud / (Math.PI * heightD));
                    }
                    subTotal = subTotal + subInhoud;

                    var vlPoint = new Point(
                        (canvas.scrollWidth / 2) - straal,
                        ((newHeight - minY) * tY) + 1
                    );
                    var vrPoint = new Point(
                        (canvas.scrollWidth / 2) + straal,
                        ((newHeight - minY) * tY) + 1
                    );

                    vaseLeft.add(vlPoint);
                    vaseRight.add(vrPoint);
                    prevDrawPoint = vlPoint;
                }
                prevPoint = curPoint;
            }
            vaseLeft.smooth({type: 'continuous'});
            vaseRight.smooth({type: 'continuous'});

            paper.view.draw();
        };

        paper.install(window);
        $scope.runReward();
    }]);