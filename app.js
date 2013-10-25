var express = require('express');
var VetSiteDb = require('./static/js/mongo').VetSiteDb;


var app = express();

// include handelbars for templating
var hbs = require('hbs');

// Set static folder
app.use(express.static('static'));

// Set rendering engine
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

// start DB
var vetSiteDb = new VetSiteDb('localhost', 27017);
vetSiteDb.addProviders();
//Load test data
vetSiteDb.testdata();

// Routing
app.get('/', function(req, res) {
  res.render('index',{
 		home:"active",
    sidebar: false,
  });
});
// Service Rout ----
app.get('/service/:id', function(req, res) {
  var contents = { services:"active" };
  vetSiteDb.getServiceList( function(error,services){
        contents.sidebar = services;
        vetSiteDb.getService(req.params.id, function(error,service){
          contents.returnItem = service;
          res.render('services', contents);
        });
  });
});
app.get('/stats', function(req, res) {
  res.send({
    character: {
      name: "Zygorf",
      stats:[
      { name:"health", ammount:100 },
      { name:"attack", ammount:10 },
      { name:"defense", ammount:5 }
      ]
    }
  });
});
// Product rout ----
app.get('/product/:id', function(req, res) {
  var contents = { products:"active" };
  vetSiteDb.getProductList( function(error,products){
        contents.sidebar = products;
        vetSiteDb.getProduct(req.params.id, function(error,product){
          contents.returnItem = product;
          res.render('products', contents);
        });
  });
});
app.get('/product', function(req, res) {
  var contents = { products:"active" };
	vetSiteDb.getProductList( function(error,products){
				contents.sidebar = products;
        vetSiteDb.getProduct(products[0]._id, function(error,product){
          contents.returnItem = product;
          res.render('products', contents);
        });
	});
});
// ---------------------------

app.get('/whoweare', function(req, res) {
   res.render('whoweare',{
   				whoweare:"active",
					sidebar:[
						{ name:"profile1", title:"profile1" },
						{ name:"profile2", title:"profile2" },
						{ name:"profile3", title:"profile3" }]
					});
});
app.get('/contact', function(req, res) {
   res.render('contact',{
   					contact:"active",
					sidebar:[
						{ name:"info1", title:"info1" },
						{ name:"info2", title:"info2" },
						{ name:"info3", title:"info3" }]
					});
});

// Start Server
app.listen(3001);