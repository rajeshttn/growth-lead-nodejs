var mongoose = require("mongoose");
var Lead = require("../models/lead");

var leadController = {};

// Show list of leads
leadController.list = function (req, res) {
  Lead.find({}).exec(function (err, leads) {
    if (err) return res.status(400).json({ status: "failure", reason: err.message })
    res.json(leads)
  });
};

// Show lead by id
leadController.get = function (req, res) {
  Lead.findOne({ id: req.params.id }).exec(function (err, lead) {
    if (err) return res.status(400).json({ status: "failure", reason: err.message })
    if (lead) return res.json(lead)
    res.status(404).json({})
  });
};

// Save new lead
leadController.save = function (req, res) {
  var lead = new Lead(req.body);
  lead.save(function (err) {
    if (err) return res.status(400).json({ status: "failure", reason: err.message })
    res.status(201).json(lead)
  });
};

// Update an lead
leadController.update = function (req, res) {
  const { first_name, last_name, mobile, email, location_type, location_string } = req.body
  Lead.findOneAndUpdate({ id: req.params.id }, { $set: { first_name, last_name, mobile, email, location_type, location_string } }, function (err, lead) {
    if (err) return res.status(400).json({ status: "failure", reason: err.message })
    if (lead) return res.status(202).json({ status: "success" })
    res.status(404).json({})
  });
};

// Delete an lead
leadController.delete = function (req, res) {
  Lead.remove({ id: req.params.id }, function (err, lead) {
    if (err) return res.status(400).json({ status: "failure", reason: err.message })
    if (lead.deletedCount) return res.json({ status: "success" })
    res.status(404).json({})
  });
};

// mark an lead
leadController.markLead = function (req, res) {
  Lead.findOneAndUpdate({ id: req.params.id }, { $set: { communication: req.body.communication, status: 'Contacted' } }, function (err, lead) {
    if (err) return res.status(400).json({ status: "failure", reason: err.message })
    if (lead) return res.status(202).json({ status: "Contacted", communication: req.body.communication })
    res.status(404).json({})
  });
};

module.exports = leadController;