'use strict';

angular.module('core').filter('core', [
	function() {
		return function(input) {
			// Core directive logic
			// ...

			return 'core filter: ' + input;
		};
	}
]);