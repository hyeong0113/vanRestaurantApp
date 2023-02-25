// comment
// - Create basic authentication of each requests
// - Create a validator on the requests, to validate parameters and payload properly
// - Create and save top 1 restaurant searched from above to MongoDB
var axios = require('axios');
require('dotenv').config()
const Restaurant = require("../models/restaurantResponse");

/*
* @title:
*              Get geometric inforamtion of current location where api is called
* @pre-condition:
*              none
* @post-condition:
*              Google Map API response object
* @description:
*              Call the Google Map API with API key(in env).
*              Respond with a result received from the Google API
* @param:
*              none
* @return:
*              JSON
*/
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

/*
* @title:
*              Get list of restaurant searched by a name of location
* @pre-condition:
*              parameters: {
*                   lat: float,
*                   long: float
*              }
* @post-condition:
*              Google Map API response object
* @description:
*              Get latitude and longitude from the request paramters.
*              Call the Google Map API with location(latitude, longitude), radius(fixed to 1500m), type(fixed to restaurant), and API key(in env).
*              Respond with a result received from the Google API
* @param:
*              lat: float
*              long: float
* @return:
*              JSON
*/
const restaurantsWithLocation = async (req, res) => {
    const {lat, long} = req.params;
    const mapRes = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    {
        params: 
        {
            location: `${lat},${long}`,
            radius: 1500,
            type: 'restaurant',
            key: process.env.API_KEY
        }
    });
    const { results } = mapRes.data;
    const mappedResults = results.map(x => new Restaurant({
        business_status: x.business_status,
        location: {
            lat: x.geometry.location.lat,
            lng: x.geometry.location.lng
        },
        name: x.name,
        opening_hours: x.opening_hours,
        photos: x.photos,
        rating: x.rating
    }));

    mappedResults.sort(compareRating);

    res.send(JSON.stringify(mappedResults));
}

function compareRating(a, b) {
    return b.rating - a.rating;
  }

module.exports = {
    restaurantsWithLocation,
    geoLocation
}
