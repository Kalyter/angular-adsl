const express = require('express');
const ConfigRoutes = express.Router();

// Require Item model in our routes module
const ConfigSite = require('../models/configsite');

// Defined get data(index or listing) route
ConfigRoutes.route('/').get(function (req, res) {
  let id = 0;
  ConfigSite.findById(id, function (err, config){
    res.json(config);
  });
});

module.exports = ConfigRoutes;
