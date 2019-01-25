const http = require('http');
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const appRoutes = require('./routes/appRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Middleware
app.use(cors({
    origin:'http://localhost:4200',
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const mongoURI = 'mongodb://sandeepalla:sandeep1996@ds131973.mlab.com:31973/documents-arena';
mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, {useNewUrlParser: true }, function(err){
    if(err)
    {
        console.error("Error! " + err);
    }
});

app.use('/', appRoutes);
http.createServer(app).listen(port);

console.log("Server is running on port:", port);