'use strict';

var config = require('./config'),
	consolidate = require('consolidate');

exports.set = function(app) {
	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');
};