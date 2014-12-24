'use strict';

//Setting up route
angular.module('crawlers').config(['$stateProvider', 'USER_ROLES',
	function($stateProvider, USER_ROLES) {
		// Crawlers state routing
		$stateProvider.
		state('listCrawlers', {
			url: '/crawlers',
			templateUrl: 'modules/crawlers/views/list-crawlers.client.view.html',
			authorizedRoles: [USER_ROLES.admin]
		}).
		state('createCrawler', {
			url: '/crawlers/create',
			templateUrl: 'modules/crawlers/views/create-crawler.client.view.html',
			authorizedRoles: [USER_ROLES.admin]
		}).
		state('viewCrawler', {
			url: '/crawlers/:crawlerId',
			templateUrl: 'modules/crawlers/views/view-crawler.client.view.html',
			authorizedRoles: [USER_ROLES.admin]
		}).
		state('editCrawler', {
			url: '/crawlers/:crawlerId/edit',
			templateUrl: 'modules/crawlers/views/edit-crawler.client.view.html',
			authorizedRoles: [USER_ROLES.admin]
		});
	}
]);