'use strict';

describe('virtualMath.version module', function() {
  beforeEach(module('virtualMath.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
