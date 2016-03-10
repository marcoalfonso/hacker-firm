'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
  message: { type: String, default: '' }, /* message */
  name: { type: String, default: '' }, 
  email: { type: String, default: '' },
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