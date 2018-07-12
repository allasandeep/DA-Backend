var http = require('http');
var express = require('express');
var port = process.env.PORT || 8080;
var app = express();
var appRoutes = require('./routes/appRoutes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.connect('mongodb://localhost:27017/DocumentsArena', {useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', appRoutes);

http.createServer(app).listen(port);

console.log("Server is running on port:", port);