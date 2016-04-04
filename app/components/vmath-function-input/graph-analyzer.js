'use strict';

// TODO negative slopes, right-to-left drawn graphs
angular.module('graphModule', []).factory('graphAnalyzer', function () {
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

        return {
            mirrorY: function (points, maxY) {
                var result = [];
                for (var i = 0; i < points.length; ++i) {
                    var mirroredPoint = {
                        "x": points[i].x,
                        "y": maxY - points[i].y
                    };
                    result.push(mirroredPoint);
                }
                return result;
            },
            analyseSphereGraph: function (points) {
                var result;
                if (points.length < 2) {
                    result = {
                        "result": false,
                        "reason": "too few points"
                    };
                    return result;
                }

                var lastSlope;
                var midPoint = -1;
                var passedMidPoint = false;

                for (var i = 0; i < points.length - 1; i++) {
                    var A = points[i];
                    var B = points[i + 1];


                    if (A.x === B.x) {
                        // TODO
                        continue;
                    }
                    if (!lastSlope) {
                        lastSlope = calculateSlope(A, B);
                        continue;
                    }
                    var slope = calculateSlope(A, B);
                    if (slope < lastSlope && passedMidPoint) {
                        result = {
                            "result": false,
                            "reason": "descending after midpoint",
                            "midpoint": midPoint,
                            "index": i
                        };
                        break;
                    }
                    if (slope < lastSlope) {
                        lastSlope= slope;
                        continue;
                    }
                    if (slope > lastSlope && passedMidPoint) {
                        lastSlope= slope;
                        continue;
                    }
                    if (slope > lastSlope) {
                        passedMidPoint = true;
                        midPoint = i;
                        lastSlope= slope;
                    }
                }

                if (!result) {
                    if (!passedMidPoint) {
                        result = {
                            "result": false,
                            "reason": "did not find a midpoint"
                        }
                    } else {
                        result = {
                            "result": true,
                            "midpoint": midPoint
                        };
                    }
                }

                logPoints(points);
                return result;
            },
            analyseCilinderGraph: function (points) {
                var result;
                if (points.length < 2) {
                    result = {
                        "result": false,
                        "reason": "too few points"
                    };
                    return result;
                }
                for (var i = 0; i < points.length - 1; i++) {
                    var A = points[i];
                    var B = points[i + 1];


                    if (A.x === B.x) {
                        // TODO
                        continue;
                    }
                    var slope = calculateSlope(A, B);
                    if (!withinRange(slope, 1, 0.05)) {
                        result = {
                            "result": false,
                            "reason": "slope not within d=0.05 of 1: " + slope,
                            "index": i
                        }
                        break;
                    }
                }
                if (!result) {
                    result = {
                        "result": true
                    }
                }
                logPoints(points);
                return result;
            }
        }
    }
);