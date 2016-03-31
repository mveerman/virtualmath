'use strict';

angular.module('virtualMath.vmath-function-input-directive', ['graphModule'])
    .directive('vmathFunctionInput', ['$window', 'graphAnalyzer', function ($window, graphAnalyzer) {
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
                this.canvas = angular.element($element).find("canvas")[0];
                
                this.graphData = {
                    base64url: '',
                    dirty: false,
                    pristine: true
                };

                this.resizeCanvas = function () {
                    // When zoomed out to less than 100%, for some very strange reason,
                    // some browsers report devicePixelRatio as less than 1
                    // and only part of the canvas is cleared then.
                    var ratio = Math.max(window.devicePixelRatio || 1, 1);
                    this.canvas.width = this.canvas.offsetWidth * ratio;
                    this.canvas.height = this.canvas.offsetHeight * ratio;
                    this.canvas.getContext("2d").scale(ratio, ratio);
                    this.drawAxes();
                    this.addLabels();

                    this.graphData.base64url = '';
                    this.graphData.dirty = false;
                    this.doGraphUpdate()(this.graphData);
                };
                angular.element($window).bind('resize', function () {
                    resizeCanvas();
                    $apply();
                });

                this.signaturePad = new SignaturePad(this.canvas);

                this.drawAxes = function () {
                    var ctx = this.canvas.getContext("2d");
                    var padding = 10;

                    ctx.strokeStyle = "grey";
                    ctx.lineWidth = 2;

                    /* y axis */
                    ctx.beginPath();
                    ctx.moveTo(padding, 0);
                    ctx.lineTo(padding, this.canvas.height);
                    ctx.stroke();

                    /* x axis */
                    ctx.beginPath();
                    ctx.moveTo(0, this.canvas.height - padding);
                    ctx.lineTo(this.canvas.width, this.canvas.height - padding);
                    ctx.stroke();
                };

                this.addLabels = function () {
                    var ctx = this.canvas.getContext("2d");

                    ctx.font = "7pt Arial";
                    ctx.save();

                    /* y axis labels */
                    ctx.translate(8, (this.canvas.height / 2) + 50);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText("Hoogte water in de fles", 10, 0);
                    ctx.restore();

                    /* x axis labels */
                    ctx.fillText("Hoeveelheid water", (this.canvas.width / 2) - 40, this.canvas.height - 1);

                    /* zero */
                    ctx.fillText("0", 1, this.canvas.height - 1);
                };

                this.resizeCanvas();

                this.redoClickHandler = function () {
                    this.resizeCanvas();
                };

                this.mouseOutHandler = function () {
                    this.graphData.pristine = false;
                    this.graphData.base64url = this.signaturePad.toDataURL();

                    var pointsToAnalyze= this.signaturePad.allPoints;
                    graphAnalyzer.mirrorY(pointsToAnalyze, this.signaturePad._canvas.height);
                    var analysis= graphAnalyzer.analyseSphereGraph(pointsToAnalyze);
                    console.log(analysis);

                    this.doGraphUpdate()(this.graphData);
                };

                this.mouseDownHandler = function () {
                    this.graphData.dirty = true;
                }
            }
        }
    }]);