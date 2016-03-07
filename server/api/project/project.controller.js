'use strict';

var _ = require('lodash');
var Project = require('./project.model');
var sendgrid  = require('sendgrid')(process.env.SENGRID_API_KEY);


// Get list of projects
exports.index = function(req, res) {
  Project.find(function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(projects);
  });
};

// Get a single project
exports.show = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  Project.create(req.body, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(project);
  });

  var welcomeEmail     = new sendgrid.Email({
    to:       req.body.email,
    from:     'hello@hackerfirm.com',
    subject:  'Welcome to Hacker Firm - Next Steps',
    html: '<h1>Hacker Firm</h1>'
  });

  welcomeEmail.setFilters({"templates": {"settings": {"enabled": 1, "template_id": "a9b91cfe-dc85-43ea-b346-e09e5ba72810"}}});
  welcomeEmail.addSubstitution(':name', req.body.username);

  sendgrid.send(welcomeEmail, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });

  var projectRequestEmail     = new sendgrid.Email({
    to:       'marcoalfonso@gmail.com',
    from:     req.body.email,
    subject:  'Hacker Firm - New Project Request',
    html: '<h1>Congrats! A new project request</h1>'
  });

  projectRequestEmail.setFilters({"templates": {"settings": {"enabled": 1, "template_id": "ec6894e5-f9b1-4192-a662-4354bc197b16"}}});
  projectRequestEmail.addSubstitution(':project_name', req.body.name);
  projectRequestEmail.addSubstitution(':terms_and_conditions', req.body.termsAndConditions);
  projectRequestEmail.addSubstitution(':budget', req.body.budget);
  projectRequestEmail.addSubstitution(':start_time', req.body.startTime);
  projectRequestEmail.addSubstitution(':platforms', req.body.platforms);
  projectRequestEmail.addSubstitution(':email', req.body.email);
  projectRequestEmail.addSubstitution(':username', req.body.username);

  sendgrid.send(projectRequestEmail, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}