'use strict';

describe('graph analysis', function () {
    beforeEach(module('graphModule'));
    var graphAnalyzer;
    beforeEach(inject(function (_graphAnalyzer_) {
        graphAnalyzer = _graphAnalyzer_;
    }));
    var xCoords = [0, 1, 2, 3, 4, 5];
    var okYCoords = [0, 2, 1, 0.5, 1, 2];
    var wrongYCoords = [0, 1, 2, 3, 4, 5];
    var points1 = [];
    for (i = 0; i < xCoords.length; i++) {
        point = {
            "x": xCoords[i],
            "y": okYCoords[i]
        };
        points1.push(point);
    }
    var points2 = [];
    for (var i = 0; i < xCoords.length; i++) {
        var point = {
            "x": xCoords[i],
            "y": wrongYCoords[i]
        };
        points2.push(point);
    }
    var okResult = {
        "result": true
    };
    it('analyzes graphs', function () {
        expect(graphAnalyzer.analyseSphereGraph(points1)).toEqual(okResult);
        expect(graphAnalyzer.analyseSphereGraph(points2)).not.toEqual(okResult);
    });
});

