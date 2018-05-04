const express = require('express');
const GalleryRoutes = express.Router();

// Require Item model in our routes module
const Albums = require('../models/gallery_albums');
const Pictures = require('../models/gallery_images');

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

GalleryRoutes.route('/view/:id').get(function (req, res) {
  let id = req.params.id;
  Pictures.aggregate(
    [
      { "$match": Pictures.where({_id: { $in: id }}).cast(Pictures) },
      {
        "$lookup": {
          "from": "pictures",
          "localField": "album_id",
          "foreignField": "album_id",
          "as": "others_pictures"
        }
      }
    ])
    .exec(function (err, pictures){
      if(err){
        console.log(err);
      }
      else {
        res.json(pictures);
      }
    });
});

module.exports = GalleryRoutes;
