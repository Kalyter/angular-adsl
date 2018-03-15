var express = require('express');
var app = express();
var ArticlesRoutes = express.Router();


// Require Item model in our routes module
var Articles = require('../models/articles');

// Defined get data(index or listing) route
ArticlesRoutes.route('/').get(function (req, res) {
  Articles.find()
    .exec(function (err, art) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(art);
      }
    });
});

ArticlesRoutes.route('/findbycat/:id').get(function (req, res) {
  var id = req.params.id;
  Articles.find()
    .where({ cat_id: id })
    .exec(function (err, art) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(art);
      }
    });
});

ArticlesRoutes.route('/findbymenu/').post(function (req, res) {
  var test = req.body.map(function(o){return o._id;});
  Articles.find({ cat_id: { $in: test } })
    .exec(function (err, art) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(art);
      }
    });
});


module.exports = ArticlesRoutes;
