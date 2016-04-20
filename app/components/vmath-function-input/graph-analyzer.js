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

    // TODO be less strict about small aberrations, demand midpoint somewhere in middle, demand graph has some length
    vm.analyzeSphereGraph = function (graph) {
        var result;
        var points = [];
        graph.path.segments.forEach(function (s) {
            points.push({x: s.point.x, y: s.point.y});
        });
        if (points.length < 2) {
            return {
                result: false,
                reason: 'too few points'
            };
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
                reason: 'did not find a midpoint'
            };
        }
        return {
            result: true,
            midpoint: midpoint
        };
    };

    vm.analyzeCylinderGraph = function (graph) {
        var tolerances = {
            angle: 15,
            outOfBounds: 10,
            length: {
                min: (graph.height - graph.originOffset) * 2 / 3
            }
        };

        var segments = graph.path.segments;
        var firstPoint = graph.path.firstSegment.point;
        var lastPoint = graph.path.lastSegment.point;

        if (segments.length < 2) {
            return cylinderFailure('too few points');
        }

        // check if drawn line has minimum length
        if (graph.path.length < tolerances.length.min) {
            return {
                result: false,
                reason: 'too short graph (was: ' + graph.path.length + ', expected: > ' + tolerances.length.min + ')'
            };
        }
        // check angle approx. 45%
        var angle = Math.atan2(firstPoint.y - lastPoint.y, lastPoint.x - firstPoint.x) * 180 / Math.PI;
        var desiredAngle = 45;
        if (angle < desiredAngle - tolerances.angle || angle > desiredAngle + tolerances.angle) {
            return {
                result: false,
                reason: 'angle out of tolerance bounds (' + angle + ' degrees)'
            };
        }
        // check intermediate points within bounds of ideal straight line between start and finish
        var diff = tolerances.outOfBounds;
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
                reason: 'points out of bounds',
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
        return '[' + point.x + ',' + point.y + ']';
    }

});
