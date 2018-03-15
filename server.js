const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./server/config/DB'),
  // routes
  MenuRoutes = require('./server/routes/menuRoutes'),
  BrandRoutes = require('./server/routes/brandRoutes'),
  CategoriesRoutes = require('./server/routes/categoriesRoutes'),
  FilesRoutes = require('./server/routes/filesRoutes'),
  ArticlesRoutes = require ('./server/routes/articlesRoutes');

// connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
  () => {console.log('Database is connected') },
err => { console.log('Can not connect to the database'+ err)}
);

//init app
const app = express();
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

// routes use
app.use('/api/menu', MenuRoutes);
app.use('/api/brand', BrandRoutes);
app.use('/api/categories', CategoriesRoutes);
app.use('/api/articles', ArticlesRoutes);
app.use('/api/files', FilesRoutes);

app.use(function(req, res, next) {
//set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const port = process.env.PORT || 4000;


const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
