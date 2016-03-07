'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
  name: String, /* message */
  user: {
	type: Schema.ObjectId,
	ref: 'User'
  },
  createdAt: {
	type: Date,
	default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);