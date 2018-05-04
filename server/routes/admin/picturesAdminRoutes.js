const express = require('express');
const PicturesAdminRoutes = express.Router();
const multer = require('multer');
const mime = require('mime');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dist/assets/img/gallery/')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname + '.' + mime.getExtension(file.mimetype));

  }
});
const upload = multer({storage: storage}).single('file');

// Require Item model in our routes module
const Pictures = require('../../models/gallery_images');



PicturesAdminRoutes.route('/update').put(function (req, res) {
  let item = req.body;
  Pictures.update({_id: item._id}, {"$set": {"title": item.title}}, function (err, pict) {
    if (err) res.json(err);
    else res.json('Successfully updated');
  });

});


// Defined delete | remove | destroy route
PicturesAdminRoutes.route('/delete/:id').get(function (req, res) {
  Pictures.findOneAndRemove({_id: req.params.id}, function (err, pict) {
    let path = 'dist/assets/img/gallery/'+ pict.link;
    if (err) res.json(err);
    else fs.unlink(path, function() { res.json('Successfully removed'); });
  });
});

PicturesAdminRoutes.route('/upload/:id').post(function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    let pictures = new Pictures;
    pictures.album_id = req.params.id;
    pictures.title = req.body.fileName;
    pictures.link = req.file.filename;
    pictures.save()
      .then(item => {
        res.status(200).json({'coin': 'Coin added successfully'});})
      .catch(err => {
        res.status(400).send("unable to save to database");
      })
    ;
  });
});


module.exports = PicturesAdminRoutes;
