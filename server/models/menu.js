const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let Menu = new Schema ({
  title: {
    type: String
  },
  link: {
    type: Number
  },
  order: {
    type: Number
  }
},{
  collection: 'menu'
});
Menu.plugin(autoIncrement.plugin, 'Menu');
module.exports = mongoose.model('Menu', Menu);
