'use strict';

describe('graph analysis', function () {
    beforeEach(module('graphModule'));
    var graphAnalyzer;
    var graph;
    beforeEach(inject(function (_graphAnalyzer_) {
        graphAnalyzer = _graphAnalyzer_;

        var canvas = document.createElement('canvas');

        paper.setup(canvas);

        var points = [new paper.Point(0, 10), new paper.Point(10, 0)];
        var path = new paper.Path(points);

        graph = {
            path: path,
            width: 10,
            height: 10
        }
    }));

    it('analyzes sphere graphs', function () {
        expect(graphAnalyzer.analyzeSphereGraph(graph).result).toBe(false);
    });
    it('analyzes cilinder graphs', function () {
        expect(graphAnalyzer.analyzeCylinderGraph(graph).result).toBe(true);
    });
});

