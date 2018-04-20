const express = require('express');
const VideosAdminRoutes = express.Router();


// Require Item model in our routes module
const Videos = require('../../models/videos');


// Defined get data(index or listing) route
VideosAdminRoutes.route('/add').post(function (req, res) {
  let videos = new Videos(req.body);
  videos.save()
   .then(item => {
     res.status(200).json({'coin': 'Coin added successfully'});
   })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined delete | remove | destroy route
VideosAdminRoutes.route('/delete/:id').get(function (req, res) {
  Videos.findOneAndRemove({_id: req.params.id}, function (err, art) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

VideosAdminRoutes.route('/update/:id').post(function (req, res) {

  Videos.findById(req.params.id, function (err, video) {
    if (!video)
      return next(new Error('Could not load Document'));
    else {
      video.title = req.body.title;
      video.description = req.body.description;

      video.save().then(video => {
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

module.exports = VideosAdminRoutes;
