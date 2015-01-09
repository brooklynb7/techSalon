'use strict';

// Configuring the Articles module
angular.module('crawlerdata').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Crawlerdata', 'crawlerdata', 'dropdown', '/crawlerdata(/create)?');
		Menus.addSubMenuItem('topbar', 'crawlerdata', 'List Crawlerdata', 'crawlerdata');
		Menus.addSubMenuItem('topbar', 'crawlerdata', 'New Crawlerdatum', 'crawlerdata/create');
	}
]);