const express = require('express');
const app = express();
const ArticlesRoutes = express.Router();


// Require Item model in our routes module
const Articles = require('../models/articles');
const Categories = require('../models/categories');

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
  let id = req.params.id;
  Categories.find({ cat_id: { $in: id } })
    .then(function(data){

      let subcat = [];
      subcat.push(Articles.find({ cat_id: { $in: id } }));

      if(data){
        data.forEach(function (item) {
          let subcatPromise = Articles.find({ cat_id: { $in: item._id } });
          subcat.push(subcatPromise);
        });
      }

      Promise.all(subcat).then(function (results) {
        res.json(results.reduce(function (arr, row) {
          return arr.concat(row);
        }, []));
      });

    });

});

ArticlesRoutes.route('/findbymenu/').post(function (req, res) {
  let test = req.body.map(function(o){return o._id;});
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


ArticlesRoutes.route('/view/:id').get(function (req, res) {
  let id = req.params.id;

/*  var cursor = Articles.aggregate(
    [
      { "$match": Articles.where({_id: { $in: id }}).cast(Articles) },
      {
        "$lookup": {
          "from": "categories",
          "localField": "cat_id",
          "foreignField": "_id",
          "as": "categorie_field"
        }
      },
      {
        "$lookup": {
          "from": "brand",
          "localField": "brand_id",
          "foreignField": "_id",
          "as": "brand_field"
        }
      }
    ]).cursor({ batchSize: 1000 }).exec();
  cursor.get(function (err, art){
    if(err){
      console.log(err);
    }
    else {
      res.json(art);
    }
  });*/

  Articles.aggregate(
    [
      { "$match": Articles.where({_id: { $in: id }}).cast(Articles) },
      {
        "$lookup": {
          "from": "categories",
          "localField": "cat_id",
          "foreignField": "_id",
          "as": "categorie_field"
        }
      },
      {
        "$lookup": {
          "from": "brand",
          "localField": "brand_id",
          "foreignField": "_id",
          "as": "brand_field"
        }
      }
    ]).exec(function (err, art){
    if(err){
      console.log(err);
    }
    else {
      res.json(art);
    }
  });

});


module.exports = ArticlesRoutes;
