var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config()

const hostname = '127.0.0.1';
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('Hello world!');
})

app.get('/location', async (req, res) => {
  const mapRes = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
  {
    params: 
    {
      input: 'Museum of Contemporary Art Australia',
      inputtype: 'textquery',
      fields: 'formatted_address,name,rating,opening_hours,geometry',
      key: process.env.API_KEY
    }
  });

  console.log(JSON.stringify(mapRes.data));
  res.send(JSON.stringify(mapRes.data));
})

var server = app.listen(port, hostname, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Server runnig at at http://%s:%s", host, port)
})