const express = require('express');
const MenuRoutes = express.Router();

// Require Item model in our routes module
const Menu = require('../models/Menu');
const Modules = require('../models/Modules');

MenuRoutes.route('/').get(function (req, res) {
  Menu.aggregate(
    [
      {
        "$lookup": {
          "from": "modules",
          "localField": "link",
          "foreignField": "_id",
          "as": "module_link"
        }
      }
    ])
    .exec(function (err, menus){
    if(err){
      console.log(err);
    }
    else {
      res.json(menus);
    }
  });
});

MenuRoutes.route('/cat/').get(function (req, res) {
  Menu.aggregate(
    [
      {
        "$lookup": {
          "from": "categories",
          "let": { "id": "$_id" },
          "pipeline": [
            { "$match":
              { "$expr":
                { "$and":
                  [
                    { "$eq": [ "$menu_id",  "$$id" ] },
                    { "$eq": [ "$cat_id",  null ] },
                  ]
                }
              }
            }
          ],
          "as": "categories_field"
        }
      }
    ])
    .sort('order')
    .exec(function (err, menus){
      if(err){
        console.log(err);
      }
      else {
        res.json(menus);
      }
    });
});

MenuRoutes.route('/modules').get(function (req, res) {
  Modules.find()
    .exec(function (err, modules) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(modules);
      }
    });
});

MenuRoutes.route('/modules/main').get(function (req, res) {
  let id = 1;
  Modules.findById(id, function (err, main) {
    res.json(main);
  });
});


module.exports = MenuRoutes;
