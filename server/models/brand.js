var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
var connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
var Brand = new Schema ({
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
