'use strict';

// TODO right-to-left drawn graphs
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

    // TODO be less strict about small aberations, demand midpoint somewhere in middle, demand graph has some length
    vm.analyzeSphereGraph = function (graph) {
        var result;
        var points = [];
        graph.path.segments.forEach(function (s) {
            points.push({x: s.point.x, y: s.point.y});
        });
        if (points.length < 2) {
            result = {
                result: false,
                reason: 'too few points'
            };
            return result;
        }

        var lastSlope;
        var midpoint;

        for (var i = 0; i < points.length - 1; i++) {
            var A = points[i];
            var B = points[i + 1];


            if (A.x === B.x) {
                return {
                    result: false,
                    reason: 'vertical line at ' + point2String(A)
                };
            }
            var slope = calculateSlope({x: A.x, y: graph.height - A.y}, {x: B.x, y: graph.height - B.y});
            if (slope < 0) {
                return {
                    result: false,
                    reason: 'negative slope at ' + point2String(A)
                };
            }
            if (typeof lastSlope === 'undefined') {
                lastSlope = slope;
                continue;
            }
            if (slope < lastSlope && typeof midpoint !== 'undefined') {
                return {
                    result: false,
                    reason: 'descending after midpoint at ' + point2String(A),
                    midpoint: midpoint
                };
            }
            if (slope < lastSlope) {
                lastSlope = slope;
                continue;
            }
            if (slope > lastSlope && typeof midpoint != 'undefined') {
                lastSlope = slope;
                continue;
            }
            if (slope > lastSlope) {
                midpoint = A;
                lastSlope = slope;
            }
        }


        if (typeof midpoint == 'undefined') {
            return {
                result: false,
                reason: "did not find a midpoint"
            }
        }
        return {
            result: true,
            midpoint: midpoint
        };
    };

    vm.analyzeCylinderGraph = function (graph) {

        var segments = graph.path.segments;

        if (segments.length < 2) {
            return cylinderFailure('too few points');
        }

        var maxDiagonalLength = Math.sqrt(Math.pow(graph.width - graph.originOffset, 2) + Math.pow(graph.height - graph.originOffset, 2));

        var firstPoint = graph.path.firstSegment.point;
        var lastPoint = graph.path.lastSegment.point;

        var actualLength = graph.path.length;

        // check if drawn line is no less than 70% length of the diagonal of the graph window
        if (maxDiagonalLength - actualLength > 3 * (maxDiagonalLength / 10)) {
            return cylinderFailure('too short graph');
        }
        // check slope between start and end approx 1
        var slope = calculateSlope(firstPoint, lastPoint);
        // expect negative slope because origin is in upper left
        if (slope > -0.9 || slope < -1.1) {
            return cylinderFailure('wrong slope (' + slope + ')');
        }

        var diff = 10;
        var boxPoint1 = firstPoint.subtract(new paper.Point(0, diff));
        var boxPoint2 = lastPoint.subtract(new paper.Point(0, diff));
        var boxPoint3 = lastPoint.add(new paper.Point(0, diff));
        var boxPoint4 = firstPoint.add(new paper.Point(0, diff));
        var boxingPath = new paper.Path([boxPoint1, boxPoint2, boxPoint3, boxPoint4, boxPoint1]);


        // enable to visualize for debugging
        // boxingPath.strokeColor = 'green';

        var outOfBounds = [];
        for (var i = 0; i < segments.length; i++) {
            var segmentPoint = segments[i].point;
            if (!boxingPath.contains(segmentPoint)) {
                outOfBounds.push({x: segmentPoint.x, y: segmentPoint.y});
            }
        }
        if (outOfBounds.length > 0) {
            return {
                result: false,
                reason: "points out of bounds",
                outOfBounds: outOfBounds
            };
        }
        return {
            result: true
        };
    };

    function calculateSlope(A, B) {
        return (B.y - A.y) / (B.x - A.x);
    }

    function cylinderFailure(reason) {
        return {
            result: false,
            reason: reason
        };
    }

    function point2String(point) {
        return '[' + point.x + ',' + point.y + ']'
    }

});
