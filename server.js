const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./server/config/DB'),
  // routes
  ConfigRoutes = require('./server/routes/configRoutes'),
  MenuRoutes = require('./server/routes/menuRoutes'),
  BrandRoutes = require('./server/routes/brandRoutes'),
  CategoriesRoutes = require('./server/routes/categoriesRoutes'),
  FilesRoutes = require('./server/routes/filesRoutes'),
  GalleryRoutes = require('./server/routes/galleryRoutes'),
  VideosAdminRoutes = require('./server/routes/admin/videosAdminRoutes'),
  VideosRoutes = require('./server/routes/videosRoutes'),
  ConfigAdminRoutes = require('./server/routes/admin/configAdminRoutes'),
  ArticlesAdminRoutes = require ('./server/routes/admin/articlesAdminRoutes'),
  BrandAdminRoutes = require('./server/routes/admin/brandAdminRoutes'),
  CategoriesAdminRoutes = require('./server/routes/admin/categoriesAdminRoutes'),
  MenuAdminRoutes = require('./server/routes/admin/menuAdminRoutes'),
  AlbumsAdminRoutes = require('./server/routes/admin/albumsAdminRoutes'),
  PicturesAdminRoutes = require('./server/routes/admin/picturesAdminRoutes'),
  FilesAdminRoutes = require('./server/routes/admin/filesAdminRoutes'),
  ArticlesRoutes = require ('./server/routes/articlesRoutes');

//jwks_auth
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


// connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DB)
  .then(function(ok, err){
    if(ok)
    {
      console.log("Connexion réussie");
    }
    else {
      console.log(err);
    }
  }
);

//check auth
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://kalyter.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: 'http://localhost:4000',
  issuer: "https://kalyter.eu.auth0.com/",
  algorithms: ['RS256']
});



//init app
const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

// routes use
app.use('/api/menu', MenuRoutes);
app.use('/api/config', ConfigRoutes);
app.use('/api/brand', BrandRoutes);
app.use('/api/categories', CategoriesRoutes);
app.use('/api/articles', ArticlesRoutes);
app.use('/api/files', FilesRoutes);
app.use('/api/videos', VideosRoutes);
app.use('/api/gallery', GalleryRoutes);
app.use('/api/admin/config', authCheck, ConfigAdminRoutes);
app.use('/api/admin/articles', authCheck, ArticlesAdminRoutes);
app.use('/api/admin/files', authCheck, FilesAdminRoutes);
app.use('/api/admin/brand', authCheck,BrandAdminRoutes);
app.use('/api/admin/categories', authCheck, CategoriesAdminRoutes);
app.use('/api/admin/menu', authCheck, MenuAdminRoutes);
app.use('/api/admin/albums', authCheck, AlbumsAdminRoutes);
app.use('/api/admin/pictures', authCheck, PicturesAdminRoutes);
app.use('/api/admin/videos', authCheck, VideosAdminRoutes);

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
