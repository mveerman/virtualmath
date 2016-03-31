'use strict';

angular.module('graphModule', []).factory('graphAnalyzer', function () {
    function logPoints(points) {
        var i = 0;
        points.forEach(function (p) {
            console.log((i++) + ": [" + p.x + "," + p.y + "]");
        });
    }

    function logSlopes(slopes) {
        var i = 0;
        slopes.forEach(function (s) {
            console.log((i++) + ": " + s);
        });
    }

    function calculateSlopes(points) {
        if (points.length < 1) {
            throw "need at least 2 points";
        }
        var slopes = [];
        for (var i = 0; i < points.length - 1; i++) {
            var A = points[i];
            var B = points[i + 1];

            if (A.x === B.x) {
                continue;
            }

            var slope = (B.y - A.y) / (B.x - A.x);

            slopes.push(slope);
        }
        return slopes;

    }

    return {
        mirrorY: function (points, maxY) {
            for (var i = 0; i < points.length; ++i) {
                points[i].y = maxY - points[i].y;
            }
            return points;
        },
        analyseSphereGraph: function (points) {
            //logPoints(points);
            var slopes = calculateSlopes(points);
            //logSlopes(slopes);
            var numberOfSlopes = slopes.length;

            var result;

            var nextSlope = slopes.shift();
            var lastSlope;
            do {
                lastSlope = nextSlope;
                nextSlope = slopes.shift();
            } while (slopes.length > 0 && lastSlope > nextSlope);
            if (slopes.length === 0) {
                result =
                {
                    "result": false,
                    "reason": "slope does not ascend anywhere"
                };
                return result;
            }
            if (slopes.length === numberOfSlopes) {
                result = {
                    "result": false,
                    "reason": "slope does not descend at start"
                };
                return result;
            }
            do {
                lastSlope = nextSlope;
                nextSlope = slopes.shift();
            } while (slopes.length > 0 && nextSlope > lastSlope);
            if (slopes.length !== 0) {
                result = {
                    "result": false,
                    "reason": "slope does not ascend until end"
                };
                return result;
            }

            result =
            {
                "result": true
            };
            return result;
        }
    };

});