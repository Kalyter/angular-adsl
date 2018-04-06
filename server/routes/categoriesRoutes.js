var express = require('express');
var app = express();
var CategoriesRoutes = express.Router();

// Require Item model in our routes module
var Categories = require('../models/categories');

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
  var id = req.params.id;
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

CategoriesRoutes.route('/add').post(function (req, res) {
  var categories = new Categories(req.body);
  categories.save()
    .then(item => {
    res.status(200).json({'coin': 'Coin added successfully'});
})
.catch(err => {
    res.status(400).send("unable to save to database");
});
});

CategoriesRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Categories.findById(id, function (err, cat) {
    res.json(cat);
  });
});


CategoriesRoutes.route('/update/:id').post(function (req, res) {

  Categories.findById(req.params.id, function(err, categories) {
    if (!categories)
      return next(new Error('Could not load Document'));
    else {
      categories.title = req.body.title;
      categories.menu_id = req.body.menu_id;
      categories.under_menu = req.body.under_menu;
      categories.cat_id = req.body.cat_id;

      categories.save().then(Categories => {
        res.json('Update complete');})
        .catch(err => {
        res.status(400).send("unable to update the database");
    });
    }
  });
});

// Defined delete | remove | destroy route
  CategoriesRoutes.route('/delete/:id').get(function (req, res) {
    Categories.findOneAndRemove({_id: req.params.id}, function(err, cat){
      if(err) res.json(err);
      else res.json('Successfully removed');
    });
  });

CategoriesRoutes.route('/uporder').put(function (req, res) {
  var updates = [];
  req.body.forEach(function (item) {
    var updatePromise = Categories.update({_id: item._id}, {"$set": {"order": item.order}}, {multi: true});
    updates.push(updatePromise);
  });

  Promise.all(updates).then(function (results) {
    res.json(results);
  });

});


module.exports = CategoriesRoutes;
