var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
var connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
var Categories = new Schema ({
  title: {
    type: String
  },
  menu_id: {
    type: String
  },
  order: {
    type: Number
  },
  under_menu: {
    type: Boolean, default: false
  }
},
{
  collection: 'categories'
});
Categories.plugin(autoIncrement.plugin, 'Categories');
module.exports = mongoose.model('Categories', Categories);
