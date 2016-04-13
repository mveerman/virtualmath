'use strict';

// TODO negative slopes, right-to-left drawn graphs
angular.module('graphModule', []).service('graphAnalyzer', function () {
    var vm = this;

    vm.analysis = '';

    vm.analyze = function (graph) {
        if (vm.analysis === 'sphere') {
            return vm.analyzeSphereGraph(graph);
        }
        if (vm.analysis === 'cylinder') {
            return vm.analyzeCylinderGraph(graph);
        }
        throw 'unknown analysis: ' + vm.analysis;
    };

    vm.mirrorY = function (points, maxY) {
        var result = [];
        for (var i = 0; i < points.length; ++i) {
            var mirroredPoint = {
                "x": points[i].x,
                "y": maxY - points[i].y
            };
            result.push(mirroredPoint);
        }
        return result;
    };

    vm.analyzeSphereGraph = function (graph) {
        var result;
        var points = getCartesianPoints(graph);
        if (points.length < 2) {
            result = {
                "result": false,
                "reason": "too few points"
            };
            return result;
        }

        var lastSlope;
        var midPointIdx = -1;
        var passedMidPoint = false;

        for (var i = 0; i < points.length - 1; i++) {
            var A = points[i];
            var B = points[i + 1];


            if (A.x === B.x) {
                // TODO
                continue;
            }
            if (typeof lastSlope === 'undefined') {
                lastSlope = calculateSlope(A, B);
                continue;
            }
            var slope = calculateSlope(A, B);
            if (slope < lastSlope && passedMidPoint) {
                var midpoint = graph.path.segments[midPointIdx].point;
                result = {
                    "result": false,
                    "reason": "descending after midpoint",
                    "midpoint": {x: midpoint.x, y: midpoint.y},
                    "index": i
                };
                break;
            }
            if (slope < lastSlope) {
                lastSlope = slope;
                continue;
            }
            if (slope > lastSlope && passedMidPoint) {
                lastSlope = slope;
                continue;
            }
            if (slope > lastSlope) {
                passedMidPoint = true;
                midPointIdx = i;
                lastSlope = slope;
            }
        }

        if (typeof result === 'undefined') {
            if (!passedMidPoint) {
                result = {
                    "result": false,
                    "reason": "did not find a midpoint"
                }
            } else {
                var midpoint = graph.path.segments[midPointIdx].point;
                result = {
                    "result": true,
                    "midpoint": {x: midpoint.x, y: midpoint.y}
                };
            }
        }

        logPoints(points);
        return result;
    };

    vm.analyzeCylinderGraph = function (graph) {

        var segments = graph.path.segments;

        if (segments.length < 2) {
            return cylinderFailure('too few points');
        }

        // -12 for axes-offset
        var maxDiagonalLength = Math.sqrt(Math.pow(graph.width - 12, 2) + Math.pow(graph.height - 12, 2));

        var firstPoint = segments[0].point;
        var lastPoint = segments[segments.length - 1].point;

        var optimalLength = firstPoint.getDistance(lastPoint);
        var actualLength = graph.path.length;

        // check if drawn line is no less than 70% length of the diagonal of the graph window
        if (maxDiagonalLength - actualLength > 3 * (maxDiagonalLength / 10)) {
            return cylinderFailure('too short graph');
        }
        // // check if within 1% of optimal length
        if (actualLength - optimalLength > (optimalLength / 100)) {
            return cylinderFailure('too long graph');
        }
        // check slope between start and end approx 1
        var slope = calculateSlope(firstPoint, lastPoint);
        // expect negative slope because origin is in upper left
        if (slope > -0.9 || slope < -1.1) {
            return cylinderFailure('wrong axis');
        }
        var result = {
            result: true
        };
        return result;
    };


    function logPoints(points) {
        var i = 0;
        points.forEach(function (p) {
            console.log((i++) + ": [" + p.x + "," + p.y + "]");
        });
    }

    function calculateSlope(A, B) {
        return (B.y - A.y) / (B.x - A.x);
    }

    function withinRange(number, expected, d) {
        return (number > expected) ? number - d <= expected : number + d >= expected;
    }

    function getCartesianPoints(graph) {
        var points = [];
        for (var i = 0, segments = graph.path.segments; i < segments.length; i++) {
            var point = {x: segments[i].point.x, y: graph.height - segments[i].point.y};
            points.push(point);
        }
        return points;
    }

    function cylinderFailure(reason) {
        var result = {
            result: false,
            reason: reason
        };
        return result;
    }

});
