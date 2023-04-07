const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const basicAuth = require('express-basic-auth');
const app = express();

require('dotenv').config();

const cors = require('cors');
const database = process.env.MONGO_URL;

const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;

mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Mongo DB connected'))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
}));

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;

const basic = basicAuth({
  users: { [userName] : password },
  challenge: true
});

app.use('/', basic, require('./routes/locationRoute'));
app.use('/', basic, require('./routes/identityRoute'));
app.use('/', basic, require('./routes/topRestaurantRoute'));
app.use('/', basic, require('./routes/favoriteRestaurantRoute'));

var server = app.listen(port, hostname, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Server runnig at at http://%s:%s", host, port)
})