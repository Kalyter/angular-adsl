var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
var connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
var Articles = new Schema ({
  title: {
    type: String
  },
  content: {
    type: String
  },
  img_head: {
    type: String
  },
  img_plus: {
    type: []
  },
  cat_id: {
    type: Number
  },
  brand_id: {
    type: Number
  }
},{
  collection: 'articles'
});
Articles.plugin(autoIncrement.plugin, 'Articles');
module.exports = mongoose.model('Articles', Articles);
