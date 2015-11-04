'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  info: String,
  budget: String,
  startTime: String,
  platforms: String,
  active: Boolean,
  termsAndConditions: Boolean
});

module.exports = mongoose.model('Project', ProjectSchema);