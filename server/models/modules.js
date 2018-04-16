const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/DB');
const connection = mongoose.createConnection(config.DB);

autoIncrement.initialize(connection);

// Define collection and schema for Items
let Modules = new Schema ({
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
