'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var crawlers = require('../../app/controllers/crawlers.server.controller');

	// Crawlers Routes
	app.route('/crawlers')
		.get(crawlers.list)
		.post(users.requiresLogin, crawlers.create);

	app.route('/crawlers/:crawlerId')
		.get(crawlers.read)
		.put(users.requiresLogin, crawlers.hasAuthorization, crawlers.update)
		.delete(users.requiresLogin, crawlers.hasAuthorization, crawlers.delete);

	// Finish by binding the Crawler middleware
	app.param('crawlerId', crawlers.crawlerByID);
};
