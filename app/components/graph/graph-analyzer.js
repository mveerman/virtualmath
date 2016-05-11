'use strict';

angular.module('virtualMath.graph', []).service('graphAnalyzer', function () {
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

    vm.analyzeSphereGraph = function (graph) {
        var debug = false;
        var tolerances = {
            noOfPoints: 3,
            height: (graph.height - graph.originOffset) * 0.6,
            fingerRadius: 10
        };


        var path = graph.path.clone();
        if (path.lastSegment.point.x < path.firstSegment.point.x) {
            path.reverse();
        }

        var pathStartPoint = path.getPointAt(0);
        var pathEndPoint = path.getPointAt(path.length);

        var pathHeight = pathStartPoint.y - pathEndPoint.y;

        if (pathHeight < tolerances.height) {
            return {
                result: false,
                reason: 'graph-height less than minimum (' + (pathStartPoint.y - pathEndPoint.y ) + ' < ' + tolerances.height + ')'
            }
        }

        var line = new paper.Path.Line(pathStartPoint, pathEndPoint);

        if (debug) {
            line.strokeColor = 'blue';
        }

        var crossings = path.getCrossings(line);

        // filter for erratic start/end on touchscreens
        var crossings = crossings.filter(function (crossing) {
                return pathStartPoint.getDistance(crossing.intersection.point) > tolerances.fingerRadius
                    && pathEndPoint.getDistance(crossing.intersection.point) > tolerances.fingerRadius;
            }
        );
        if (crossings.length != 1) {
            if (debug) {
                crossings.forEach(function (crosssing) {
                    var circle = new paper.Shape.Circle(crosssing.intersection.point, 5);
                    circle.fillColor = 'red';
                });
            }

            return {
                result: false,
                reason: 'crossings != 1 (' + crossings.length + ')'
            };
        }

        var intersectionPoint = crossings[0].intersection.point;


        // TODO check if midpoint somewhere halfway the path height


        if (debug) {
            var intersectHighlight = new paper.Path.Circle(intersectionPoint, 5);
            intersectHighlight.fillColor = 'blue';
        }

        var topPath = path.split(crossings[0]);

        var bottomPathStartPoint = path.getPointAt(0);
        var bottomPathEndPoint = path.getPointAt(path.length);
        var lowerTriangle = new paper.Path([new paper.Point(bottomPathStartPoint.x, bottomPathEndPoint.y), bottomPathEndPoint, bottomPathStartPoint]);
        lowerTriangle.closed = true;

        if (debug) {
            lowerTriangle.fillColor = 'yellow';
            lowerTriangle.fillColor.alpha = 0.2;
        }
        var i;

        for (i = 0; i < path.segments.length; i++) {
            if (!lowerTriangle.contains(path.segments[i].point)) {
                return {
                    result: false,
                    reason: 'lower points outside triangle'
                }
            }
        }
        var topPathStartPoint = topPath.getPointAt(0);
        var topPathEndPoint = topPath.getPointAt(topPath.length);
        var upperTriangle = new paper.Path([new paper.Point(topPathEndPoint.x, topPathStartPoint.y), topPathEndPoint, topPathStartPoint]);
        upperTriangle.closed = true;

        if (debug) {
            upperTriangle.fillColor = 'yellow';
            upperTriangle.fillColor.alpha = 0.2;
        }
        for (i = 0; i < path.segments.length; i++) {
            if (!lowerTriangle.contains(path.segments[i].point)) {
                return {
                    result: false,
                    reason: 'lower points outside triangle'
                }
            }
        }

        return {
            result: true
        };

    };

    vm.analyzeCylinderGraph = function (graph) {
        var tolerances = {
            noOfPoints: 2,
            angle: 15,
            outOfBounds: 10,
            length: {
                min: (graph.height - graph.originOffset) * 2 / 3
            }
        };

        var segments = graph.path.segments;
        var firstPoint = graph.path.firstSegment.point;
        var lastPoint = graph.path.lastSegment.point;

        if (segments.length < tolerances.noOfPoints) {
            return {
                result: false,
                reason: 'too few points (was: ' + segments.length + ', expected: > ' + tolerances.noOfPoints + ')'
            };
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
});
