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
            controller: function ($scope, $element, $attrs) {
                var canvas = angular.element($element).find("canvas")[0];
                var path;
                var drag = false;
                initPaper();
                drawAxes();

                var vm = this;

                function initPaper() {
                    paper.install(window);
                    paper.setup(canvas);
                }

                function drawAxes() {
                    var yAxis = new paper.Path();
                    var offSet = 12;
                    yAxis.add(new paper.Point(offSet, offSet));
                    yAxis.add(new paper.Point(offSet, canvas.scrollHeight - offSet));
                    yAxis.strokeColor = 'black';
                    var xAxis = new paper.Path();
                    xAxis.add(new paper.Point(offSet, canvas.scrollHeight - offSet));
                    xAxis.add(new paper.Point(canvas.scrollWidth - offSet, canvas.scrollHeight - offSet));
                    xAxis.strokeColor = 'black';
                    var yLabel = new paper.PointText(new paper.Point(offSet, (canvas.scrollHeight - offSet) / 2));
                    yLabel.content = 'hoogte water';
                    var textStyle = {
                        fontSize: 12,
                        fontFamily: 'Courier'
                    };
                    yLabel.style= textStyle;
                    yLabel.rotate(270, yLabel.bounds.bottomLeft);
                    var xLabel = new paper.PointText(new paper.Point((canvas.scrollWidth - offSet) / 2, canvas.scrollHeight));
                    xLabel.content = 'hoeveelheid water';
                    xLabel.style= textStyle;
                    paper.view.draw();
                }

                function createPoint(event) {
                    var rect = canvas.getBoundingClientRect();
                    return new paper.Point(
                        event.clientX - rect.left,
                        event.clientY - rect.top
                    );
                }

                function analyze(path) {
                    var points = [];
                    for (var i = 0; i < path.segments.length; i++) {
                        points.push({x: path.segments[i].point.x, y: canvas.scrollHeight - path.segments[i].point.y});
                    }
                    var result = graphAnalyzer.analyze(points);

                    handleGraphResult(result);

                    if (result.midpoint) {
                        // place debug-point for now
                        var midpoint = path.segments[result.midpoint].point;
                        var circle = new paper.Path.Circle(new Point(midpoint.x, midpoint.y), 5);
                        circle.fillColor = 'blue';
                    }
                    return result;
                }

                function handleGraphResult(result) {
                    if (result.result) {
                        angular.element(canvas).removeClass('wrong-graph').addClass('right-graph');
                    } else {
                        angular.element(canvas).removeClass('right-graph').addClass('wrong-graph');
                    }
                }

                vm.graphData = {
                    base64url: '',
                    pristine: true,
                    dirty: false
                };

                vm.redoClickHandler = function () {
                    angular.element(canvas).removeClass('wrong-graph').removeClass('right-graph');
                    paper.project.clear();
                    paper.project.view.update();
                    vm.graphData.dirty = false;
                    drawAxes();
                    path = undefined;
                };

                vm.mouseUp = function () {
                    if (!drag) {
                        return;
                    }
                    path.simplify();
                    vm.graphData.analysis = analyze(path);
                    vm.graphData.pristine = false;
                    vm.graphData.base64url = canvas.toDataURL.apply(canvas);
                    vm.doGraphUpdate()(vm.graphData);
                    drag = false;
                };

                vm.mouseDrag = function (event) {
                    if (drag) {
                        path.add(createPoint(event));
                        path.smooth({type: 'continuous'});
                    }
                };

                vm.mouseDown = function (event) {
                    if (path !== undefined) {
                        // only 1 line allowed to keep analysis simple
                        return;
                    }
                    vm.graphData.dirty = true;
                    drag = true;
                    path = new paper.Path();
                    path.strokeColor = 'black';
                    path.add(createPoint(event));
                };

                vm.touchEnd = function () {
                    vm.mouseUp();
                };

                vm.touchMove = function (event) {
                    vm.mouseDrag(event.targetTouches[0]);
                };

                vm.touchStart = function (event) {
                    vm.mouseDown(event.targetTouches[0]);
                };

            }
        };
    }])
;

