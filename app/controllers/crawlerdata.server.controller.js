'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Crawlerdatum = mongoose.model('Crawlerdatum'),
	cheerio = require('cheerio'),
	_ = require('lodash');

/**
 * Create a Crawlerdatum
 */
exports.create = function(req, res) {
	var crawlerdatum = new Crawlerdatum(req.body);
	crawlerdatum.user = req.user;

	crawlerdatum.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawlerdatum);
		}
	});
};

/**
 * Show the current Crawlerdatum
 */
exports.read = function(req, res) {
	res.jsonp(req.crawlerdatum);
};

/**
 * Update a Crawlerdatum
 */
exports.update = function(req, res) {
	var crawlerdatum = req.crawlerdatum ;

	crawlerdatum = _.extend(crawlerdatum , req.body);

	crawlerdatum.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawlerdatum);
		}
	});
};

/**
 * Delete an Crawlerdatum
 */
exports.delete = function(req, res) {
	var crawlerdatum = req.crawlerdatum ;

	crawlerdatum.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawlerdatum);
		}
	});
};

/**
 * List of Crawlerdata
 */
exports.list = function(req, res) { 
	Crawlerdatum.find().sort('-created').populate('user', 'displayName').exec(function(err, crawlerdata) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(crawlerdata);
		}
	});
};

/**
 * Crawlerdatum middleware
 */
exports.crawlerdatumByID = function(req, res, next, id) { 
	Crawlerdatum.findById(id).populate('user', 'displayName').exec(function(err, crawlerdatum) {
		if (err) return next(err);
		if (! crawlerdatum) return next(new Error('Failed to load Crawlerdatum ' + id));
		req.crawlerdatum = crawlerdatum ;
		next();
	});
};

/**
 * Crawlerdatum authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.crawlerdatum.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
