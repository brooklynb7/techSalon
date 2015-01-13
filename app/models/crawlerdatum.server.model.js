'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Crawlerdatum Schema
 */
var CrawlerdatumSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	subTitle: {
		type: String,
		default: '',
		trim: true
	},
	targetPeople: {
		type: String,
		default: '',
		trim: true
	},
	tags: {
		type: String,
		default: '',
		trim: true
	},
	datetime: {
		type: Date,
		default: null
	},
	location: {
		type: String,
		default: '',
		trim: true
	},
	address: {
		type: String,
		default: '',
		trim: true
	},
	charge: {
		type: String,
		default: '',
		trim: true
	},
	sponsor: {
		type: String,
		default: '',
		trim: true
	},
	agenda: {
		type: String,
		default: '',
		trim: true
	},
	intro: {
		type: String,
		default: '',
		trim: true
	},
	img: {
		type: String,
		default: '',
		trim: true
	},
	seats: {
		type: String,
		default: '',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	isOver: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	provider: {
		type: Schema.ObjectId,
		ref: 'Crawler'
	}
});

mongoose.model('Crawlerdatum', CrawlerdatumSchema);