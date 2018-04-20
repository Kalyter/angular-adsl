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

CategoriesRoutes.route('/getmenu/:id').get(function (req, res) {
  let id = req.params.id;
  Categories.find()
    .where({ menu_id: id })
    .exec(function (err, art) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(art);
      }
    });
});

module.exports = CategoriesRoutes;
