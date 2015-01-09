'use strict';

angular.module('core').filter('hasIntersection', [
	function() {
		return function(array1, array2) {
			for (var index1 in array1) {
				for (var index2 in array2) {
					if (array2[index2] === array1[index1]) {
						return true;
					}
				}
			}
			return false;
		};
	}
]).filter('hasValue', [
	function() {
		return function(array, value) {
			for (var index in array) {
				if (array[index] === value) {
					return true;
				}
			}
			return false;
		};
	}
]).filter('convertDevStatus', [
	function() {
		return function(status) {
			var text = '';
			switch (status) {
				case 1:
					text = '未开发';
					break;
				case 2:
					text = '开发中';
					break;
				case 3:
					text = '已开发';
					break;
				default:
					break;
			}
		};
	}
]);