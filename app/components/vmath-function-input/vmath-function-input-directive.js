'use strict';

angular.module('virtualMath.vmath-function-input-directive', ['virtualMath.graph'])
    .directive('vmathFunctionInput', ['graphAnalyzer', '$window', function (graphAnalyzer, $window) {
        return {
            restrict: 'E',
            templateUrl: 'components/vmath-function-input/vmath-function-input-directive.html',
            transclude: true,
            scope: {
                doGraphUpdate: '&onGraphUpdate',
                data: '='
            },
            bindToController: true,
            controllerAs: 'FIctrl',
            controller: function ($scope, $element, $attrs) {
                var vm = this;
                var canvas = angular.element($element).find("canvas")[0];
                var path;
                var drag = false;
                var originOffset = 12;
                initPaper();
                drawAxes();
                vm.graphData = {
                    base64url: '',
                    dirty: false
                };

                if (vm.data != null) {
                    drawPrevious(vm.graphData, vm.data);
                }


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

                function drawPrevious(graphData, pData) {
                    var previous = new paper.Path();
                    previous.importJSON(JSON.parse(pData.pathAsJson));
                    previous.strokeColor = 'black';
                    paper.view.draw();
                    graphData.dirty = true;
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

                    if (graphAnalyzer.debug) {
                        visualizeResult(result);
                    }
                    return result;
                }

                function visualizeResult(result) {
                    if (result.result) {
                        angular.element(canvas).removeClass('wrong-graph').addClass('right-graph');
                    } else {
                        angular.element(canvas).removeClass('right-graph').addClass('wrong-graph');
                    }
                    paper.view.draw();
                }

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
                    if (graphAnalyzer.debug) {
                        console.log("analysis result", vm.graphData.analysis);
                    }
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

