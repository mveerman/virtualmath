'use strict';

angular.module('virtualMath.version', [
  'virtualMath.version.interpolate-filter',
  'virtualMath.version.version-directive'
])

.value('version', '0.2');
