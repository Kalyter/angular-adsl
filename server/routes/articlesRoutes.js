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

ArticlesRoutes.route('/add').post(function (req, res) {
  var articles = new Articles(req.body);
  articles.save()
    .then(item => {
    res.status(200).json({'coin': 'Coin added successfully'});})
.catch(err => {
    res.status(400).send("unable to save to database");
})
  ;
});

// Defined delete | remove | destroy route
ArticlesRoutes.route('/delete/:id').get(function (req, res) {
  Articles.findOneAndRemove({_id: req.params.id}, function (err, art) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

ArticlesRoutes.route('/update/:id').post(function (req, res) {

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

ArticlesRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Articles.findById(id, function (err, art) {
    res.json(art);
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
