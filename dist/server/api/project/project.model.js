'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	nda: Boolean,
	name: String,
	budget: String,
	startDate: String,
	platform: String
});

module.exports = mongoose.model('Project', ProjectSchema);