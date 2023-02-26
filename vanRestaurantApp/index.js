const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const basicAuth = require('express-basic-auth');

require('dotenv').config();

const cors = require('cors');
const database = process.env.MONGO_URL;

const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;

mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('e don connect'))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/', require('./routes/location'));

app.use(basicAuth({
  users: { 'juneKwak':'qwe123' },
  challenge: true
}));

var server = app.listen(port, hostname, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Server runnig at at http://%s:%s", host, port)
})