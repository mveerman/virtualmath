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
            // console.log('build vase called');
            // console.log(data);

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

            var inhoud = Math.PI * Math.pow((canvas.width / 4), 2) * canvas.height;
            var xPerc = inhoud / (maxX - minX);
            // console.info("Inhoud:", inhoud, "xPerc:", xPerc);

            var tY = (canvas.height - 2) / (maxY - minY);

            var middle = new paper.Path();
            middle.add(new Point(canvas.width / 2, 0));
            middle.add(new Point(canvas.width / 2, canvas.height));
            middle.strokeColor = '#efefef';
            middle.dashArray = [6, 3];

            var original = new paper.Path();
            original.importJSON(data);
            original.strokeColor = '#FF6330';
            original.dashArray = [6, 3];
            original.closed = false;
            original.fullySelected = false;
            /*original.smooth({
             type: 'catmull-rom',
             factor: 1.0
             });*/
            //original.simplify(3.0);
            // console.log(original);

            var vaseLeft = new paper.Path();
            vaseLeft.strokeColor = 'black';
            vaseLeft.strokeWidth = 2;
            vaseLeft.add(new Point(canvas.width / 2, canvas.height - 1));
            var vaseRight = new paper.Path();
            vaseRight.strokeColor = 'black';
            vaseRight.strokeWidth = 2;
            vaseRight.add(new Point(canvas.width / 2, canvas.height - 1));

            var orgSegs = original.getSegments();
            var prevPoint = null;
            var prevDrawPoint = null;

            var subTotal = 0;


            for (var ii = 0; ii < orgSegs.length; ii++) {
                var seg = orgSegs[ii];
                var curve = seg.curve;
                if (!seg.isLast()) {
                    for (var ci = 0; ci < curve.length; ci = ci + 10) { // set a point every 5px
                        var curPoint = curve.getPointAt(ci);

                        var angle = 0;
                        var multiplier = 0;
                        if (prevPoint != null) {
                            angle = Math.atan2(prevPoint.y - curPoint.y, curPoint.x - prevPoint.x) * 180 / Math.PI;
                            multiplier = (90 - angle) / 45;
                        }
                        // console.info("x0:", curPoint.x, "y0:", curPoint.y);
                        // console.log("angle: ", angle, "multiplier: ", multiplier, "height: ", curPoint.y);
                        if (angle >= 0 && multiplier <= 2 && multiplier >= 0) {
                            var newHeight = curPoint.y;
                            if (prevPoint != null) {
                                newHeight = prevPoint.y;
                            }

                            // straal berekenen
                            var heightD = 0;
                            var straal = 0;
                            var subInhoud = 0;
                            if (prevPoint != null) {
                                heightD = prevPoint.y - curPoint.y;
                                subInhoud = ((curPoint.x - minX) * xPerc) - subTotal;
                                straal = Math.sqrt(subInhoud / (Math.PI * heightD));
                            }
                            subTotal = subTotal + subInhoud;
                            // console.info("straal: ", straal, "Hoogte", heightD);


                            /*var vlPoint = new Point(
                             (canvas.width / 2) - ((canvas.width / 4) * multiplier),
                             ((newHeight - minY) * tY) + 1 // Y point; transposed with transposition to fill the
                             );
                             var vrPoint = new Point(
                             (canvas.width / 2) + ((canvas.width / 4) * multiplier),
                             ((newHeight - minY) * tY) + 1 // Y point; transposed with transposition to fill the
                             );*/

                            var vlPoint = new Point(
                                (canvas.width / 2) - straal,
                                ((newHeight - minY) * tY) + 1 // Y point; transposed with transposition to fill the
                            );
                            var vrPoint = new Point(
                                (canvas.width / 2) + straal,
                                ((newHeight - minY) * tY) + 1 // Y point; transposed with transposition to fill the
                            );

                            vaseLeft.add(vlPoint);
                            vaseRight.add(vrPoint);
                            prevDrawPoint = vlPoint;
                        }
                        prevPoint = curPoint;
                    }
                }
            }
            vaseLeft.smooth({
                type: 'catmull-rom',
                factor: 0.4
            });
            vaseRight.smooth({
                type: 'catmull-rom',
                factor: 0.4
            });

            paper.view.draw();
            // console.log('debug')
        };

        paper.install(window);
        $scope.runReward();
    }]);