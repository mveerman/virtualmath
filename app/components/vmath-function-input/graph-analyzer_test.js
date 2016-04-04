'use strict';

describe('graph analysis', function () {
    beforeEach(module('graphModule'));
    var graphAnalyzer;
    beforeEach(inject(function (_graphAnalyzer_) {
        graphAnalyzer = _graphAnalyzer_;
    }));
    var xCoords = [0, 1, 2, 3, 4, 5];
    var yCoordsSphere = [0, 2, 3, 3.5, 4.5, 6.5];
    var yCoordsCilinder = [0, 1, 2, 3, 4, 5];
    var sphereGraph = [];
    for (i = 0; i < xCoords.length; i++) {
        point = {
            "x": xCoords[i],
            "y": yCoordsSphere[i]
        };
        sphereGraph.push(point);
    }
    var cilinderGraph = [];
    for (var i = 0; i < xCoords.length; i++) {
        var point = {
            "x": xCoords[i],
            "y": yCoordsCilinder[i]
        };
        cilinderGraph.push(point);
    }
    var okResult = {
        "result": true
    };
    it('analyzes sphere graphs', function () {
        expect(graphAnalyzer.analyseSphereGraph(sphereGraph).result).toBe(true);
        expect(graphAnalyzer.analyseSphereGraph(cilinderGraph).result).toBe(false);
    });
    it('analyzes cilinder graphs', function () {
        expect(graphAnalyzer.analyseCilinderGraph(sphereGraph).result).toBe(false);
        expect(graphAnalyzer.analyseCilinderGraph(cilinderGraph).result).toBe(true);
    });
});

