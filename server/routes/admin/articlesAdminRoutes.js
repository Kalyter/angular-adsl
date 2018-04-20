const express = require('express');
const ArticlesAdminRoutes = express.Router();

// Require Item model in our routes module
const Articles = require('../../models/articles');

ArticlesAdminRoutes.route('/add').post(function (req, res) {
  let articles = new Articles(req.body);
  articles.save()
    .then(item => {
      res.status(200).json({'coin': 'Coin added successfully'});})
    .catch(err => {
      res.status(400).send("unable to save to database");
    })
  ;
});

// Defined delete | remove | destroy route
ArticlesAdminRoutes.route('/delete/:id').get(function (req, res) {
  Articles.findOneAndRemove({_id: req.params.id}, function (err, art) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

ArticlesAdminRoutes.route('/update/:id').post(function (req, res) {

  Articles.findById(req.params.id, function (err, art) {
    if (!art)
      return next(new Error('Could not load Document'));
    else {
      art.title = req.body.title;
      art.content = req.body.content;
      if (typeof req.body.img_head !== 'undefined') {
        art.img_head = req.body.img_head;
      }
      if (typeof req.body.img_plus !== 'undefined') {
        art.img_plus = req.body.img_plus;
      }
      art.cat_id = req.body.cat_id;
      art.brand_id = req.body.brand_id;


      art.save().then(art => {
        res.json('Update complete');
      })
        .
        catch(err => {
          res.status(400).send("unable to update the database");
        })
      ;
    }
  });
});

ArticlesAdminRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Articles.findById(id, function (err, art) {
    res.json(art);
  });
});


module.exports = ArticlesAdminRoutes;
