'use strict';

//Crawlerdata service used to communicate Crawlerdata REST endpoints
angular.module('crawlerdata').factory('Crawlerdata', ['$resource',
	function($resource) {
		return $resource('crawlerdata/:crawlerdatumId', { crawlerdatumId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);