'use strict';

//Crawlers service used to communicate Crawlers REST endpoints
angular.module('crawlers').factory('Crawlers', ['$resource',
	function($resource) {
		return $resource('crawlers/:crawlerId', {
			crawlerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);