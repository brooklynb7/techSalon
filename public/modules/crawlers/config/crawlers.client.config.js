'use strict';

// Configuring the Articles module
angular.module('crawlers').run(['Menus','USER_ROLES',
	function(Menus, USER_ROLES) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', '爬虫', 'crawlers', 'dropdown', '/crawlers(/create)?', false, [USER_ROLES.admin]);
		Menus.addSubMenuItem('topbar', 'crawlers', '爬虫列表', 'crawlers');
		Menus.addSubMenuItem('topbar', 'crawlers', '新建爬虫', 'crawlers/create');
	}
]);