const express = require('express');
const ConfigAdminRoutes = express.Router();


// Require Item model in our routes module
const ConfigSite = require('../../models/configsite');


// Defined get data(index or listing) route
ConfigAdminRoutes.route('/update').put(function (req, res) {
  let item = req.body;
  ConfigSite.update(
    {_id: item._id},
    {"$set": {
      "title": item.title,
      "mail": item.mail,
      "adresse": item.adresse,
      "phone": item.phone,
      "mobile": item.mobile,
      "fax": item.fax,
      "show_brands": item.show_brands}}, function (err, conf) {
    if (err) res.json(err);
    else res.json('Successfully updated');
  });

});



module.exports = ConfigAdminRoutes;
