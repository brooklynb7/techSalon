'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('../errors.server.controller'),
	Crawler = mongoose.model('Crawler'),
	_ = require('lodash'),
	request = require('request'),
	cheerio = require('cheerio');

var baseRequest = request.defaults({
	method: 'GET',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
	}
});


var handleRequest_itjuzi = function(body){
	var $ = cheerio.load(body);
	$('body>.wrapper>.page-wrapper>#page-content .activity.clearfix').each(function(i, ele){
		console.log($(this).find('.activity-info>a').attr('href'));
	});
};

var handleRequest_alibabaTech = function(body){
	var $ = cheerio.load(body);
	$('body>.content>.row>.span7>.row.mt-30>.span7>div:not(.clear)').each(function(i, ele){
		console.log($(this).find('.bottom-image-line>p>strong>a').attr('href'));
	});
};

var fetchDetail = function(url, crawler){

};

exports.fetchMainPage = function(req, res){
	var crawler = req.crawler;

	baseRequest(crawler.mainPage, function(error, response, body) {
		if(!error && (response.statusCode === 200 || response.statusCode === 304)){
			if(crawler.segment === 'itjuzi'){
				handleRequest_itjuzi(body);
			} else if(crawler.segment === 'alibabaTech') {
				handleRequest_alibabaTech(body);
			}
		}		
		res.send(body);
	});
};