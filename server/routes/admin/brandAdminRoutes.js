const express = require('express');
const BrandAdminRoutes = express.Router();
const multer = require('multer');
const mime = require('mime');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dist/assets/img/brand/')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname + '.' + mime.getExtension(file.mimetype));

  }
});
const upload = multer({storage: storage}).single('photo');

// Require Item model in our routes module
const Brand = require('../../models/Brand');


BrandAdminRoutes.route('/add').post(function (req, res) {

  let brand = new Brand(req.body);
  brand.save()
    .then(item => {
      res.status(200).json({'coin': 'Coin added successfully'});})
    .catch(err => {
      res.status(400).send("unable to save to database");
    })
  ;
});

BrandAdminRoutes.route('/upload').post(function (req, res, next) {
  let path = '';
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }

    res.json(req.file);
  });
});

BrandAdminRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Brand.findById(id, function (err, brand) {
    res.json(brand);
  });
});

BrandAdminRoutes.route('/update/:id').post(function (req, res) {

  Brand.findById(req.params.id, function (err, brand) {
    if (!brand)
      return next(new Error('Could not load Document'));
    else {
      brand.title = req.body.title;
      brand.description = req.body.description;
      if (req.body.img) {
        brand.img = req.body.img;
      }


      brand.save().then(brand => {
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

// Defined delete | remove | destroy route
BrandAdminRoutes.route('/delete/:id').get(function (req, res) {
  Brand.findOneAndRemove({_id: req.params.id}, function (err, menu) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

BrandAdminRoutes.route('/uporder').put(function (req, res) {
  let updates = [];
  req.body.forEach(function (item) {
    let updatePromise = Brand.update({_id: item._id}, {"$set": {"order": item.order}}, {multi: true});
    updates.push(updatePromise);
  });

  Promise.all(updates).then(function (results) {
    res.json(results);
  });

});

module.exports = BrandAdminRoutes;
