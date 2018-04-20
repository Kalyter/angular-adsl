const express = require('express');
const FilesRoutes = express.Router();
const fs = require("fs");
const dir = 'dist/assets/img/articles';

// Defined get data(index or listing) route
FilesRoutes.route('/').get(function (req, res) {
  let files = fs.readdirSync(dir);
  res.json(files);
});


module.exports = FilesRoutes;
