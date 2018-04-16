const express = require('express');
const app = express();
const FilesRoutes = express.Router();
const fs = require("fs");

const dir = 'dist/assets/img/articles';

const multer = require('multer');
const mime = require('mime');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dist/assets/img/articles/')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);

  }
});
const upload = multer({storage: storage}).single('file');


// Defined get data(index or listing) route
FilesRoutes.route('/').get(function (req, res) {
  let files = fs.readdirSync(dir);
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
