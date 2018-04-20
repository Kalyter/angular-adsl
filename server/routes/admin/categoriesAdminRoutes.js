const express = require('express');
const CategoriesAdminRoutes = express.Router();

// Require Item model in our routes module
const Categories = require('../../models/categories');

CategoriesAdminRoutes.route('/add').post(function (req, res) {
  let categories = new Categories(req.body);
  categories.save()
    .then(item => {
      res.status(200).json({'coin': 'Coin added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

CategoriesAdminRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Categories.findById(id, function (err, cat) {
    res.json(cat);
  });
});


CategoriesAdminRoutes.route('/update/:id').post(function (req, res) {

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
CategoriesAdminRoutes.route('/delete/:id').get(function (req, res) {
  Categories.findOneAndRemove({_id: req.params.id}, function(err, cat){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

CategoriesAdminRoutes.route('/uporder').put(function (req, res) {
  let updates = [];
  req.body.forEach(function (item) {
    let updatePromise = Categories.update({_id: item._id}, {"$set": {"order": item.order}}, {multi: true});
    updates.push(updatePromise);
  });

  Promise.all(updates).then(function (results) {
    res.json(results);
  });

});


module.exports = CategoriesAdminRoutes;
