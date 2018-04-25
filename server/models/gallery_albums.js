const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let Albums = new Schema ({
  title: {
    type: String
  },
  order: {
    type: Number
  }
},{
  collection: 'albums'
});
Albums.plugin(autoIncrement.plugin, 'Albums');
module.exports = mongoose.model('Albums', Albums);
