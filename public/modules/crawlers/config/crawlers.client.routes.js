'use strict';

//Setting up route
angular.module('crawlers').config(['$stateProvider',
	function($stateProvider) {
		// Crawlers state routing
		$stateProvider.
		state('listCrawlers', {
			url: '/crawlers',
			templateUrl: 'modules/crawlers/views/list-crawlers.client.view.html'
		}).
		state('createCrawler', {
			url: '/crawlers/create',
			templateUrl: 'modules/crawlers/views/create-crawler.client.view.html'
		}).
		state('viewCrawler', {
			url: '/crawlers/:crawlerId',
			templateUrl: 'modules/crawlers/views/view-crawler.client.view.html'
		}).
		state('editCrawler', {
			url: '/crawlers/:crawlerId/edit',
			templateUrl: 'modules/crawlers/views/edit-crawler.client.view.html'
		});
	}
]);