var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
var connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
var Menu = new Schema ({
  title: {
    type: String
  },
  link: {
    type: String
  },
  order: {
    type: Number
  }
},{
  collection: 'menu'
});
Menu.plugin(autoIncrement.plugin, 'Menu');
module.exports = mongoose.model('Menu', Menu);
