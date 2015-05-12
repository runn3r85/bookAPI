var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to MongoDB
var db = mongoose.connect('mongodb://localhost/bookAPI');

// Book Model for mongoose
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api', bookRouter);

app.get('/', function(req, res){
  res.send('Welcome to my API!');
});

app.listen(port, function(){
  console.log("Gulp is running my app on PORT: " + port);
});