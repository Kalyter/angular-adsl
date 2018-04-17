const express = require('express');
const VideosAdminRoutes = express.Router();
const request = require('request');

// Require Item model in our routes module
const Videos = require('../models/videos');


// Defined get data(index or listing) route
VideosAdminRoutes.route('/add').get(function (req, res) {

  let link = "https://www.youtube.com/watch?v=0bnglVg4n4g";
  let apikey = "AIzaSyDRTh04ioW26pRy1TyguqKB3mirOuxN1dM";


  let link_id = link.match('(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})');

  let api = "https://www.googleapis.com/youtube/v3/videos?id="+link_id[1]+"&key="+apikey+"&part=snippet";

  request(api, function (error, response, body) {
    if(error){
      res.status(response.statusCode).send(error);
    }
    else {
      let data = JSON.parse(body);
      let videos = new Videos;
      videos.youtube_id = data.items[0].id;
      videos.title = data.items[0].snippet.title;
      videos.description = data.items[0].snippet.description;
      videos.thumb = data.items[0].snippet.thumbnails.standard.url;

      videos.save()
        .then(item => {
          res.status(200).json({'coin': 'Coin added successfully'});
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });


    }

  });




});

module.exports = VideosAdminRoutes;
