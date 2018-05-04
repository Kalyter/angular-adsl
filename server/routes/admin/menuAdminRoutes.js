const express = require('express');
const MenuAdminRoutes = express.Router();

// Require Item model in our routes module
const Menu = require('../../models/Menu');
const Modules = require('../../models/Modules');


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
const upload = multer({storage: storage}).single('file');


MenuAdminRoutes.route('/upload/main').post(function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
  });
});

MenuAdminRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Menu.findById(id, function (err, menu){
    res.json(menu);
  });
});


MenuAdminRoutes.route('/add').post(function (req, res) {
  let menu = new Menu(req.body);
  menu.save()
    .then(item => {
      res.status(200).json({'coin': 'Coin added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

MenuAdminRoutes.route('/uporder').put(function (req, res) {
  let updates = [];
  req.body.forEach(function (item){
    let updatePromise = Menu.update({_id: item._id},  {"$set": {"order": item.order }}, { multi: true });
    updates.push(updatePromise);
  });

  Promise.all(updates).then(function(results){
    res.json(results);
  });

});

MenuAdminRoutes.route('/update/:id').post(function (req, res) {

  Menu.findById(req.params.id, function(err, menu) {
    if (!menu)
      return next(new Error('Could not load Document'));
    else {
      menu.title = req.body.title;
      menu.link = req.body.link;
      menu.order = req.body.order;

      menu.save().then(menu => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });


});

// Defined delete | remove | destroy route
MenuAdminRoutes.route('/delete/:id').get(function (req, res) {
  Menu.findOneAndRemove({_id: req.params.id}, function(err, menu){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

MenuAdminRoutes.route('/update/modules').put(function (req, res) {
  let item = req.body;
  Modules.update({_id: 1}, {"$set": {"title_m": item.title_m, "content_m": item.content_m, "img_1": item.img_1, "img_2": item.img_2}}, function (err, mod) {
    if (err) res.json(err);
    else res.json('Successfully updated');
  });

});

module.exports = MenuAdminRoutes;
