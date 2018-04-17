const express = require('express');
const VideosRoutes = express.Router();
const request = require('request');

// Require Item model in our routes module
const Videos = require('../models/videos');


VideosRoutes.route('/').get(function (req, res) {
  Videos.find()
    .exec(function (err, vids) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(vids);
      }
    });
});

VideosRoutes.route('/view/:id').get(function (req, res) {
  let id = req.params.id;
  Videos.findById(id, function (err, video){
    res.json(video);
  });
});



module.exports = VideosRoutes;
