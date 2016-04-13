'use strict';

describe('graph analysis', function () {
    beforeEach(module('graphModule'));
    var graphAnalyzer;
    beforeEach(inject(function (_graphAnalyzer_) {
        graphAnalyzer = _graphAnalyzer_;
    }));

    // TODO dunno how to test Paper.js with Karma :-/
    it('analyzes sphere graphs', function () {
       // expect(graphAnalyzer.analyzeSphereGraph(graph).result).toBe(false);
    });
    it('analyzes cilinder graphs', function () {
       //  expect(graphAnalyzer.analyzeCilinderGraph(graph).result).toBe(true);
    });
});

