const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let Pictures = new Schema ({
  title: {
    type: String
  },
  album_id: {
    type: Number
  },
  link: {
    type: String
  }
},{
  collection: 'pictures'
});
Pictures.plugin(autoIncrement.plugin, 'Pictures');
module.exports = mongoose.model('Pictures', Pictures);
