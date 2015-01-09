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
	mainPage: {
		type: String,
		default: '',
		trim: true
	},
	fetched: {
		type: [
			{
				type: String,
				trim: true
			}
		],
		default: []
	},
	current: {
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
	devStatus: {
		type: Number,
		enum: [1, 2, 3],
		default: 1
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