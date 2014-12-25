'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Crawler = mongoose.model('Crawler'),
	_ = require('lodash'),
	request = require('request'),
	cheerio = require('cheerio'),
	config = require('../../config/config');

/**
 * Create a Crawler
 */
exports.create = function(req, res) {
};