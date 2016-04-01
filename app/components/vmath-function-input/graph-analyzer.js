'use strict';

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
                    // TODO handle negative slopes
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
                        continue;
                    }
                    if (slope > lastSlope && passedMidPoint) {
                        continue;
                    }
                    if (slope > lastSlope) {
                        passedMidPoint = true;
                        midPoint = i;
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
            }
        }
    }
);