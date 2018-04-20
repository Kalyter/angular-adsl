const express = require('express');
const MenuRoutes = express.Router();

// Require Item model in our routes module
const Menu = require('../models/Menu');

/*// Defined get data(index or listing) route
MenuRoutes.route('/test').get(function (req, res) {

  var modules = new Modules();
  modules.title = "Main";
  modules.link = "/main";
  modules.save()
    .then(item => {
    res.status(200).json({'coin': 'Coin added successfully'});
})
.catch(err => {
    res.status(400).send("unable to save to database");
});
});*/


MenuRoutes.route('/').get(function (req, res) {
  Menu.aggregate(
    [
      {
        "$lookup": {
          "from": "modules",
          "localField": "link",
          "foreignField": "_id",
          "as": "module_link"
        }
      }
    ])
    .exec(function (err, menus){
    if(err){
      console.log(err);
    }
    else {
      res.json(menus);
    }
  });
});

module.exports = MenuRoutes;
