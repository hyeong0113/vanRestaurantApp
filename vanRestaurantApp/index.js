var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config()

const cors = require('cors');

const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));

app.use('/', require('./routes/location'));

var server = app.listen(port, hostname, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Server runnig at at http://%s:%s", host, port)
})