'use strict';

angular.module('virtualMath.vmath-function-input-directive', ['graphModule'])
    .directive('vmathFunctionInput', ['graphAnalyzer', '$window', function (graphAnalyzer, $window) {
        return {
            restrict: 'E',
            templateUrl: 'components/vmath-function-input/vmath-function-input-directive.html',
            transclude: true,
            scope: {
                doGraphUpdate: '&onGraphUpdate'
            },
            bindToController: true,
            controllerAs: 'FIctrl',
            controller: function ($element, $attrs) {
                var vm = this;
                vm.canvas = angular.element($element).find("canvas")[0];

                vm.graphData = {
                    base64url: '',
                    dirty: false,
                    pristine: true
                };

                vm.resizeCanvas = function () {
                    // When zoomed out to less than 100%, for some very strange reason,
                    // some browsers report devicePixelRatio as less than 1
                    // and only part of the canvas is cleared then.
                    var ratio = Math.max(window.devicePixelRatio || 1, 1);
                    vm.canvas.width = this.canvas.offsetWidth * ratio;
                    vm.canvas.height = this.canvas.offsetHeight * ratio;
                    vm.canvas.getContext("2d").scale(ratio, ratio);
                    vm.drawAxes();
                    vm.addLabels();

                    vm.graphData.base64url = '';
                    vm.graphData.dirty = false;
                    vm.doGraphUpdate()(vm.graphData);
                };
                angular.element($window).bind('resize', function () {
                    resizeCanvas();
                    $apply();
                });

                vm.signaturePad = new SignaturePad(vm.canvas);

                vm.drawAxes = function () {
                    var ctx = vm.canvas.getContext("2d");
                    var padding = 10;

                    ctx.strokeStyle = "grey";
                    ctx.lineWidth = 2;

                    /* y axis */
                    ctx.beginPath();
                    ctx.moveTo(padding, 0);
                    ctx.lineTo(padding, vm.canvas.height);
                    ctx.stroke();

                    /* x axis */
                    ctx.beginPath();
                    ctx.moveTo(0, vm.canvas.height - padding);
                    ctx.lineTo(vm.canvas.width, vm.canvas.height - padding);
                    ctx.stroke();
                };

                vm.addLabels = function () {
                    var ctx = vm.canvas.getContext("2d");

                    ctx.font = "7pt Arial";
                    ctx.save();

                    /* y axis labels */
                    ctx.translate(8, (vm.canvas.height / 2) + 50);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText("Hoogte water in de fles", 10, 0);
                    ctx.restore();

                    /* x axis labels */
                    ctx.fillText("Hoeveelheid water", (vm.canvas.width / 2) - 40, vm.canvas.height - 1);

                    /* zero */
                    ctx.fillText("0", 1, vm.canvas.height - 1);
                };

                vm.resizeCanvas();

                vm.redoClickHandler = function () {
                    angular.element(vm.canvas).removeClass("wrong-graph");
                    angular.element(vm.canvas).removeClass("right-graph");
                    vm.signaturePad._reset();
                    vm.resizeCanvas();
                };

                vm.mouseOutHandler = function () {
                    vm.graphData.pristine = false;
                    vm.graphData.base64url = vm.signaturePad.toDataURL();
                    if (this.signaturePad.allPoints.length > 0) {
                        var pointsToAnalyze = graphAnalyzer.mirrorY(vm.signaturePad.allPoints, vm.signaturePad._canvas.height);
                        var analysis = graphAnalyzer.analyze(pointsToAnalyze);
                        console.log("analysis", analysis);
                        if (analysis.result) {
                            angular.element(this.canvas).removeClass("wrong-graph");
                            angular.element(this.canvas).addClass("right-graph");
                        } else {
                            angular.element(this.canvas).removeClass("right-graph");
                            angular.element(this.canvas).addClass("wrong-graph");
                        }
                    }

                    vm.doGraphUpdate()(vm.graphData);
                };

                vm.mouseDownHandler = function () {
                    vm.graphData.dirty = true;
                }
            }
        }
    }]);