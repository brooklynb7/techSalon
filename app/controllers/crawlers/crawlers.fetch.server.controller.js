'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('../errors.server.controller'),
	Crawlerdatum = mongoose.model('Crawlerdatum'),
	_ = require('lodash'),
	request = require('request'),
	cheerio = require('cheerio');

var baseRequest = request.defaults({
	method: 'GET',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
	}
});

var segment = {
	ITJUZI: 'itjuzi',
	ALIBABATECH: 'alibabaTech'
};


var handleDetailRequest = {};

handleDetailRequest[segment.ITJUZI] = function(body, crawler){
	var $ = cheerio.load(body);
	var $content = $('body>.wrapper>.page-wrapper>#page-content>article');

	var $activityInfo = $content.children('div').eq(1).find('.normal-box-no-pad.new-box.clearfix');
	var crawlerdatum = new Crawlerdatum();
	crawlerdatum.name = crawlerdatum.title = $content.find('.normal-box-no-pad.new-box>span').text();
	crawlerdatum.subTitle =  $activityInfo.children('h1').text();

	var $activityBasic = $activityInfo.find('.activity-basic.activity-basic-detail>ul>li');
	crawlerdatum.datetime = $activityBasic.eq(0).children('div').text().replace('年', '.').replace('月', '.').replace('日', '');
	crawlerdatum.datetime = new Date(crawlerdatum.datetime).valueOf();
	crawlerdatum.location = $activityBasic.eq(1).children('div').text();
	crawlerdatum.seats = $activityBasic.eq(2).children('div').text();
	crawlerdatum.charge = $activityBasic.eq(3).children('div').text();
	crawlerdatum.sponsor = $activityBasic.eq(4).children('div').text();

	crawlerdatum.provider = crawler;
	crawlerdatum.save(function(err) {
		if (err) {
			console.error(errorHandler.getErrorMessage(err));
		}
	});	
};

handleDetailRequest[segment.ALIBABATECH] = function(body, crawler){

};

var fetchDetail = function(url, crawler){
	baseRequest(url, function(error, response, body){
		if(!error && (response.statusCode === 200 || response.statusCode === 304)){
			var fun = handleDetailRequest[crawler.segment];
			if(fun) fun(body, crawler);
		}
	});
};

var handleMainPageRequest = {};

handleMainPageRequest[segment.ITJUZI] =  function(body, crawler){
	var $ = cheerio.load(body);
	$('body>.wrapper>.page-wrapper>#page-content .activity.clearfix').each(function(i, ele){
		var url = $(this).find('.activity-info>a').attr('href');
		if(!_.contains(crawler.fetched, url)){
			fetchDetail(url, crawler);
		}		
	});
};

handleMainPageRequest[segment.ALIBABATECH] = function(body, crawler){
	var $ = cheerio.load(body);
	$('body>.content>.row>.span7>.row.mt-30>.span7>div:not(.clear)').each(function(i, ele){
		var url = $(this).find('.bottom-image-line>p>strong>a').attr('href');

		console.log(url);
	});
};

exports.fetchMainPage = function(req, res){
	var crawler = req.crawler;

	baseRequest(crawler.mainPage, function(error, response, body) {
		if(!error && (response.statusCode === 200 || response.statusCode === 304)){
			var fun = handleMainPageRequest[crawler.segment];
			if(fun) fun(body,crawler);
		}
		res.send(body);
	});
};