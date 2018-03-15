var express = require('express');
var app = express();
var FilesRoutes = express.Router();
var fs = require("fs");

var dir = 'dist/assets/img/brand/';


// Defined get data(index or listing) route
FilesRoutes.route('/').get(function (req, res) {
  var files = fs.readdirSync(dir);
  res.json(files);
});


module.exports = FilesRoutes;
