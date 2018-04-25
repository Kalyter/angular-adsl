const express = require('express');
const GalleryRoutes = express.Router();

// Require Item model in our routes module
const Albums = require('../models/gallery_albums');

GalleryRoutes.route('/').get(function (req, res) {
  Albums.aggregate(
    [
      {
        "$lookup": {
          "from": "pictures",
          "localField": "_id",
          "foreignField": "album_id",
          "as": "pictures"
        }
      }
    ])
    .sort('order')
    .exec(function (err, albums){
      if(err){
        console.log(err);
      }
      else {
        res.json(albums);
      }
    });
});

module.exports = GalleryRoutes;

/*
GalleryRoutes.route('/').get(function (req, res) {
  Albums.find()
    .sort('order')
    .exec(function (err, menus) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(menus);
      }
    });
});*/
