'use strict';

angular.module('myApp.vmath-function-input-directive', [])
    .directive('vmathFunctionInput', function ($window) {
        return {
            restrict: 'E',
            templateUrl: 'components/vmath-function-input/vmath-function-input-directive.html',
            transclude: true,
            scope: {
                fieldName: '='
            },
            controller: ['$scope', '$element', '$attrs', '$window', function ($scope, $element, $attrs, $window) {
                $scope.fieldName = $attrs.fieldName;

                $scope.canvas = angular.element($element).find("canvas")[0];
                $scope.redoButton = angular.element($element).find("button")[0];
                $scope.field = angular.element($element).find("input")[0];

                $scope.resizeCanvas = function () {
                    // When zoomed out to less than 100%, for some very strange reason,
                    // some browsers report devicePixelRatio as less than 1
                    // and only part of the canvas is cleared then.
                    var ratio = Math.max(window.devicePixelRatio || 1, 1);
                    $scope.canvas.width = $scope.canvas.offsetWidth * ratio;
                    $scope.canvas.height = $scope.canvas.offsetHeight * ratio;
                    $scope.canvas.getContext("2d").scale(ratio, ratio);
                    $scope.drawAxes();
                    $scope.addLabels();
                    $scope.field.value=$scope.signaturePad.toDataURL();
                };
                angular.element($window).bind('resize', function () {
                    $scope.resizeCanvas();
                    $scope.$apply();
                });

                $scope.signaturePad = new SignaturePad($scope.canvas);

                $scope.drawAxes = function () {
                    var ctx = $scope.canvas.getContext("2d");
                    var padding = 10;

                    ctx.strokeStyle = "grey";
                    ctx.lineWidth = 2;

                    /* y axis */
                    ctx.beginPath();
                    ctx.moveTo(padding, 0);
                    ctx.lineTo(padding, $scope.canvas.height);
                    ctx.stroke();

                    /* x axis */
                    ctx.beginPath();
                    ctx.moveTo(0, $scope.canvas.height-padding);
                    ctx.lineTo($scope.canvas.width, $scope.canvas.height-padding);
                    ctx.stroke();
                };

                $scope.addLabels = function () {
                    var ctx = $scope.canvas.getContext("2d");

                    ctx.font = "7pt Arial";
                    ctx.save();

                    /* y axis labels */
                    ctx.translate(8,  ($scope.canvas.height/2)+50);
                    ctx.rotate(-Math.PI/2);
                    ctx.fillText("Hoogte water in de fles", 10, 0);
                    ctx.restore();

                    /* x axis labels */
                    ctx.fillText("Hoeveelheid water", ($scope.canvas.width /2)-40, $scope.canvas.height-1);

                    /* zero */
                    ctx.fillText("0", 1, $scope.canvas.height-1);

                };

                $scope.resizeCanvas();

                $scope.redoButton.addEventListener("click", function() {
                   $scope.resizeCanvas();
                });

                $scope.canvas.addEventListener("mouseout", function () {
                    $scope.field.value=$scope.signaturePad.toDataURL();
                });
            }]
        };

    });
