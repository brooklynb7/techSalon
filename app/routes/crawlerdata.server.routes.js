'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var crawlerdata = require('../../app/controllers/crawlerdata.server.controller');

	// Crawlerdata Routes
	app.route('/crawlerdata')
		.get(crawlerdata.list)
		.post(users.requiresLogin, crawlerdata.create);

	app.route('/crawlerdata/:crawlerdatumId')
		.get(crawlerdata.read)
		.put(users.requiresLogin, crawlerdata.hasAuthorization, crawlerdata.update)
		.delete(users.requiresLogin, crawlerdata.hasAuthorization, crawlerdata.delete);

	// Finish by binding the Crawlerdatum middleware
	app.param('crawlerdatumId', crawlerdata.crawlerdatumByID);
};
