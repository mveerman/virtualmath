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
                var originOffset = 12;
                initPaper();
                drawAxes();

                var vm = this;

                function initPaper() {
                    paper.install(window);
                    paper.setup(canvas);
                }

                function drawAxes() {
                    var yAxis = new paper.Path();
                    var offSet = originOffset;
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
                    yLabel.style = textStyle;
                    yLabel.rotate(270, yLabel.bounds.bottomLeft);
                    var xLabel = new paper.PointText(new paper.Point((canvas.scrollWidth - offSet) / 2, canvas.scrollHeight));
                    xLabel.content = 'hoeveelheid water';
                    xLabel.style = textStyle;
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
                    var graph = {
                        path: path,
                        width: paper.view.size.width,
                        height: paper.view.size.height,
                        originOffset: originOffset
                    };
                    var result = graphAnalyzer.analyze(graph);

                    handleGraphResult(result);


                    console.log(result);
                    return result;
                }

                function handleGraphResult(result) {
                    if (result.result) {
                        angular.element(canvas).removeClass('wrong-graph').addClass('right-graph');
                    } else {
                        angular.element(canvas).removeClass('right-graph').addClass('wrong-graph');
                    }
                    if (result.midpoint) {
                        // TODO remove this after debugging
                        var circle = new paper.Path.Circle(new Point(result.midpoint.x, result.midpoint.y), 5);
                        circle.fillColor = 'blue';
                        paper.view.draw();
                    }
                }

                vm.graphData = {
                    base64url: '',
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
                    vm.graphData.base64url = canvas.toDataURL.apply(canvas);
                    vm.graphData.pathAsJson = path.exportJSON();
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

