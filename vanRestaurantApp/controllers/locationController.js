// Create a node.js (Express) API getting top 20 rated restaurants
// nearby
// geolocation - current location
// (lat, long) or location name (eg. Lougheed)
// (lat, long) = location(ex location=-33.8670522%2C151.1957362)
// location name = keyword
// radius
// through Google API.

// - Create basic authentication of each requests
// - Create a validator on the requests, to validate parameters and payload properly
// - Create and save top 1 restaurant searched from above to MongoDB
var axios = require('axios');
require('dotenv').config()

const test = (req, res) => {
    res.send('Hello world!');
}

const geoLocation = async (req, res) => {
    const geoRes = await axios.post('https://www.googleapis.com/geolocation/v1/geolocate', {},
    {
        params:
        {
            key: process.env.API_KEY
        }
    })
    res.send(JSON.stringify(geoRes.data));
}

const location = async (req, res) => {
    const mapRes = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    {
        params: 
        {
            location: '-33.8670522,151.1957362',
            radius: 1500,
            keyword: 'cruise',
            key: process.env.API_KEY
        }
    });
    res.send(JSON.stringify(mapRes.data));
}

module.exports = {
    test,
    geoLocation,
    location
}
