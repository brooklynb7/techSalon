'use strict';

var morgan = require('morgan'),
	util = require('../util');

morgan.token('datetime2', function(req, res) {
	return new Date().Format2();
});

exports.dev = morgan('dev');

exports.format2 = morgan('[:datetime2] :remote-addr :method :url :status :res[content-length] -:response-time ms');