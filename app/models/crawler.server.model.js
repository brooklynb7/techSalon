'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Crawler Schema
 */
var CrawlerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Crawler name',
		trim: true
	},
	mainPage:{
		type: String,
		default: '',
		trim: true
	},
	segment: {
		type: String,
		unique: true,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Crawler', CrawlerSchema);