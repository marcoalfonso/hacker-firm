'use strict';

var _ = require('lodash');
var Message = require('./message.model');
var sendgrid  = require('sendgrid')(process.env.SENGRID_API_KEY);

// Get list of messages
exports.index = function(req, res) {
  var userId = req.user._id;
  Message.find({"user" : userId}).exec(function (err, messages) {
    if(err) { return handleError(res, err); }
    return res.json(200, messages);
  });
};

// Get a single message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }
    return res.json(message);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  req.body.user = req.user;
  Message.create(req.body, function(err, message) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(message);
  });

  var userMessageEmail     = new sendgrid.Email({
    to:       'marcoalfonso@gmail.com',
    from:     req.body.email,
    subject:  'Hacker Firm - New User Message',
    html: '<h1>A user has left you a message</h1>'
  });

  userMessageEmail.setFilters({"templates": {"settings": {"enabled": 1, "template_id": "f7e8b34f-0ec7-46ec-9851-3af36b184877"}}});
  userMessageEmail.addSubstitution(':message', req.body.message);
  userMessageEmail.addSubstitution(':name', req.body.name);
  userMessageEmail.addSubstitution(':email', req.body.email);

  sendgrid.send(userMessageEmail, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, message) {
    if (err) { return handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }
    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(message);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}