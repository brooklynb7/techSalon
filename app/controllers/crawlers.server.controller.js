'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Crawler = mongoose.model('Crawler'),
	_ = require('lodash');

/**
 * Create a Crawler
 */
exports.create = function(req, res) {
	var crawler = new Crawler(req.body);
	crawler.user = req.user;

	crawler.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawler);
		}
	});
};

/**
 * Show the current Crawler
 */
exports.read = function(req, res) {
	res.jsonp(req.crawler);
};

/**
 * Update a Crawler
 */
exports.update = function(req, res) {
	var crawler = req.crawler ;

	crawler = _.extend(crawler , req.body);

	crawler.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawler);
		}
	});
};

/**
 * Delete an Crawler
 */
exports.delete = function(req, res) {
	var crawler = req.crawler ;

	crawler.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawler);
		}
	});
};

/**
 * List of Crawlers
 */
exports.list = function(req, res) { 
	Crawler.find().sort('-created').populate('user', 'displayName').exec(function(err, crawlers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawlers);
		}
	});
};

/**
 * Crawler middleware
 */
exports.crawlerByID = function(req, res, next, id) { 
	Crawler.findById(id).populate('user', 'displayName').exec(function(err, crawler) {
		if (err) return next(err);
		if (! crawler) return next(new Error('Failed to load Crawler ' + id));
		req.crawler = crawler ;
		next();
	});
};

/**
 * Crawler authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.crawler.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

