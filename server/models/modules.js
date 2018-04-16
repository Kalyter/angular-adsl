var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
const   config = require('../config/DB');
var connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
var Modules = new Schema ({
  title:{
    type: String
  },
  link: {
    type: String
  }
},{
  collection: 'modules'
});
Modules.plugin(autoIncrement.plugin, 'Modules');
module.exports = mongoose.model('Modules', Modules);
