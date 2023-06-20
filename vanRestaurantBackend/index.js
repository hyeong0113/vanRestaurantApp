const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');
const app = express();

require('dotenv').config();

const cors = require('cors');
const database = process.env.MONGO_URL;

const hostname = '0.0.0.0';
const port = process.env.PORT || 8080;

mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Mongo DB connected'))
.catch(err => console.log(err));

app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://ec2-54-215-91-235.us-west-1.compute.amazonaws.com:3000"
}));

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;

const basic = basicAuth({
  users: { [userName] : password },
  challenge: true
});

app.use('/', require('./routes/locationRoute'));
app.use('/', require('./routes/identityRoute'));
app.use('/', require('./routes/topRestaurantRoute'));
app.use('/', require('./routes/favoriteRestaurantRoute'));

var server = app.listen(port, hostname, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Server runnig at at http://%s:%s", host, port)
})