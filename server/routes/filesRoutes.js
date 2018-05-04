const express = require('express');
const FilesRoutes = express.Router();
const fs = require("fs");
const dir = 'dist/assets/img/articles';
const dir2 = 'dist/assets/img/brand';

// Defined get data(index or listing) route
FilesRoutes.route('/').get(function (req, res) {
  let files = fs.readdirSync(dir);
  res.json(files);
});

FilesRoutes.route('/brands').get(function (req, res) {
  let files = fs.readdirSync(dir2);
  res.json(files);
});


module.exports = FilesRoutes;
