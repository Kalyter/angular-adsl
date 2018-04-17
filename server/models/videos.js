const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let Videos = new Schema ({
  youtube_id:{
    type: String
  },
  title: {
    type: String
  },
  thumb: {
    type: String
  },
  description: {
    type: String
  }
},{
  collection: 'videos'
});
Videos.plugin(autoIncrement.plugin, 'Videos');
module.exports = mongoose.model('Videos', Videos);
