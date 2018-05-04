const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let ConfigSite = new Schema ({
  title: {
    type: String
  },
  mail: {
    type: String
  },
  adresse: {
    type: String
  },
  phone: {
    type: String
  },
  mobile: {
    type: String
  },
  fax: {
    type: String
  },
  show_brands: {
    type: Number
  }
},{
  collection: 'config_site'
});
ConfigSite.plugin(autoIncrement.plugin, 'ConfigSite');
module.exports = mongoose.model('ConfigSite', ConfigSite);
