'use strict';

//Setting up route
angular.module('crawlerdata').config(['$stateProvider',
	function($stateProvider) {
		// Crawlerdata state routing
		$stateProvider.
		state('listCrawlerdata', {
			url: '/crawlerdata',
			templateUrl: 'modules/crawlerdata/views/list-crawlerdata.client.view.html'
		}).
		state('createCrawlerdatum', {
			url: '/crawlerdata/create',
			templateUrl: 'modules/crawlerdata/views/create-crawlerdatum.client.view.html'
		}).
		state('viewCrawlerdatum', {
			url: '/crawlerdata/:crawlerdatumId',
			templateUrl: 'modules/crawlerdata/views/view-crawlerdatum.client.view.html'
		}).
		state('editCrawlerdatum', {
			url: '/crawlerdata/:crawlerdatumId/edit',
			templateUrl: 'modules/crawlerdata/views/edit-crawlerdatum.client.view.html'
		});
	}
]);