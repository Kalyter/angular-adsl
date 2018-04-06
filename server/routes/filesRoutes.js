var express = require('express');
var app = express();
var FilesRoutes = express.Router();
var fs = require("fs");

var dir = 'dist/assets/img/articles';

var multer = require('multer');
const mime = require('mime');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dist/assets/img/articles/')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);

  }
});
var upload = multer({storage: storage}).single('file');


// Defined get data(index or listing) route
FilesRoutes.route('/').get(function (req, res) {
  var files = fs.readdirSync(dir);
  res.json(files);
});

FilesRoutes.route('/upload').post(function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }

    return res.end();
  });
});

module.exports = FilesRoutes;
