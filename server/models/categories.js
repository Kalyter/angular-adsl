const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let Categories = new Schema ({
  title: {
    type: String
  },
  menu_id: {
    type: Number
  },
  order: {
    type: Number
  },
  under_menu: {
    type: Boolean, default: false
  },
  cat_id:{
    type: Number
  }
},
{
  collection: 'categories'
});
Categories.plugin(autoIncrement.plugin, 'Categories');
module.exports = mongoose.model('Categories', Categories);
