const express = require('express');
const BrandRoutes = express.Router();

// Require Item model in our routes module
const Brand = require('../models/Brand');

// Defined get data(index or listing) route
BrandRoutes.route('/').get(function (req, res) {
  Brand.find()
    .sort('order')
    .exec(function (err, menus) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(menus);
      }
    });
});

module.exports = BrandRoutes;
