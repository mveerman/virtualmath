'use strict';

angular.module('virtualMath.graph').service('graphUtil', function () {

    var vm = this;

    vm.createSphereGraphPath = function (canvas, originOffset) {
        var path = new paper.Path();

        // wolframAlpha with radius 5:
        // ParametricPlot[ {-1/3 * pi * x^3 + pi * x^2 * 5, x} , {x,0,10}  ]

        var volume = function (h, r) {
            return Math.PI * Math.pow(h, 2) * (3 * r - h) / 3;
        };
        var graphWidth = canvas.scrollWidth - originOffset;
        var graphHeight = canvas.scrollHeight - originOffset;

        var noOfPoints = 50; // should be dividable by 2, excludes origin

        var heights = [];
        var i;

        for (i = 0; i <= noOfPoints; i++) {
            heights.push(i);
        }
        var radius = noOfPoints / 2;
        var volumes = [];
        for (i = 0; i < heights.length; i++) {
            volumes.push(volume(heights[i], radius));
        }

        var volumeScaleFactor = graphWidth / volumes[volumes.length - 1];
        var heightScaleFactor = graphHeight / heights[heights.length - 1];


        for (i = 0; i < volumes.length; i++) {
            var x = volumes[i] * volumeScaleFactor;
            var y = heights[i] * heightScaleFactor;
            var point = new paper.Point(x + originOffset, graphHeight - y);
            path.add(point);
            var circle = new paper.Shape.Circle(point, 1);
            circle.fillColor = 'red';
        }

        return path;
    };
});