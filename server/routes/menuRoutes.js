var express = require('express');
var app = express();
var MenuRoutes = express.Router();


// Require Item model in our routes module
var Menu = require('../models/Menu');



// Defined get data(index or listing) route
MenuRoutes.route('/').get(function (req, res) {
  Menu.find()
    .sort('order')
    .exec(function (err, menus){
    if(err){
      console.log(err);
    }
    else {
      res.json(menus);
    }
  });
});


MenuRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Menu.findById(id, function (err, menu){
    res.json(menu);
  });
});



MenuRoutes.route('/add').post(function (req, res) {
  var menu = new Menu(req.body);
  menu.save()
    .then(item => {
    res.status(200).json({'coin': 'Coin added successfully'});
})
.catch(err => {
    res.status(400).send("unable to save to database");
});
});



MenuRoutes.route('/uporder').put(function (req, res) {
  var updates = [];
  req.body.forEach(function (item){
    var updatePromise = Menu.update({_id: item._id},  {"$set": {"order": item.order }}, { multi: true });
    updates.push(updatePromise);
});

  Promise.all(updates).then(function(results){
    res.json(results);
  });

});

MenuRoutes.route('/update/:id').post(function (req, res) {

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
MenuRoutes.route('/delete/:id').get(function (req, res) {
  Menu.findOneAndRemove({_id: req.params.id}, function(err, menu){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = MenuRoutes;
