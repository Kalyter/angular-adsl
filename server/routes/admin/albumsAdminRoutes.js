const express = require('express');
const AlbumsAdminRoutes = express.Router();

// Require Item model in our routes module
const Albums = require('../../models/gallery_albums');


AlbumsAdminRoutes.route('/add').post(function (req, res) {

  let album = new Albums(req.body);
  album.save()
    .then(item => {
      res.status(200).json({'coin': 'Coin added successfully'});})
    .catch(err => {
      res.status(400).send("unable to save to database");
    })
  ;
});


AlbumsAdminRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Albums.aggregate(
    [
      { "$match": Albums.where({_id: { $in: id }}).cast(Albums) },
      {
        "$lookup": {
          "from": "pictures",
          "localField": "_id",
          "foreignField": "album_id",
          "as": "pictures"
        }
      }
    ])
    .exec(function (err, albums){
      if(err){
        console.log(err);
      }
      else {
        res.json(albums);
      }
    });
});


AlbumsAdminRoutes.route('/update').put(function (req, res) {
let item = req.body;
Albums.update({_id: item._id}, {"$set": {"title": item.title}}, function (err, album) {
  if (err) res.json(err);
  else res.json('Successfully updated');
});

});


// Defined delete | remove | destroy route
AlbumsAdminRoutes.route('/delete/:id').get(function (req, res) {
  Albums.findOneAndRemove({_id: req.params.id}, function (err, album) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

AlbumsAdminRoutes.route('/uporder').put(function (req, res) {
  let updates = [];
  req.body.forEach(function (item) {
    let updatePromise = Albums.update({_id: item._id}, {"$set": {"order": item.order}}, {multi: true});
    updates.push(updatePromise);
  });

  Promise.all(updates).then(function (results) {
    res.json(results);
  });

});

module.exports = AlbumsAdminRoutes;
