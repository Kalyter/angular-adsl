const express = require('express');
const app = express();
const CategoriesRoutes = express.Router();

// Require Item model in our routes module
const Categories = require('../models/categories');

// Defined get data(index or listing) route
CategoriesRoutes.route('/').get(function (req, res) {
  Categories.find()
    .sort('order')
    .exec(function (err, categorie) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(categorie);
      }
    });
});

CategoriesRoutes.route('/sous').get(function (req, res) {
  Categories.find()
    .where({ cat_id: { $gt: 0 } })
    .sort('order')
    .exec(function (err, cat) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(cat);
      }
    });
});


CategoriesRoutes.route('/getmenu/:id').get(function (req, res) {
  let id = req.params.id;
  Categories.find()
    .where({ menu_id: id })
    .exec(function (err, cat) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(cat);
      }
    });
});

module.exports = CategoriesRoutes;
