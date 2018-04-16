const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let Brand = new Schema ({
  title: {
    type: String
  },
  img: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number
  }
},{
  collection: 'brand'
});
Brand.plugin(autoIncrement.plugin, 'Brand');
module.exports = mongoose.model('Brand', Brand);
