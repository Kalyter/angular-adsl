const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let Articles = new Schema ({
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
