const express = require('express');
const FilesAdminRoutes = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dist/assets/img/articles/')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);

  }
});
const upload = multer({storage: storage}).single('file');


FilesAdminRoutes.route('/upload').post(function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }

    return res.end();
  });
});

module.exports = FilesAdminRoutes;
