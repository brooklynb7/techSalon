'use strict';

// Configuring the Articles module
angular.module('crawlers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Crawlers', 'crawlers', 'dropdown', '/crawlers(/create)?', false, ['admin']);
		Menus.addSubMenuItem('topbar', 'crawlers', 'List Crawlers', 'crawlers');
		Menus.addSubMenuItem('topbar', 'crawlers', 'New Crawler', 'crawlers/create');
	}
]);