// comment
// - Create basic authentication of each requests
// - Create a validator on the requests, to validate parameters and payload properly v
// - Create and save top 1 restaurant searched from above to MongoDB v
const axios = require('axios');

require('dotenv').config()
const Restaurant = require("../models/restaurantResponse");


const auth = {
    username: 'juneKwak',
    password: 'qwe123'
}

/*
* @title:
*              Get geometric inforamtion of current location where api is called.
* @pre-condition:
*              none
* @post-condition:
*              Google Map API response object.
* @description:
*              Call the Google Map API with API key(in env).
*              Respond with a result received from the Google API.
* @param:
*              none
* @return:
*              JSON
*/
const geoLocation = async (req, res) => {
    const geoRes = await axios.post('https://www.googleapis.com/geolocation/v1/geolocate', { },
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
*              Get list of restaurant searched by a name of location.
* @pre-condition:
*              parameters: {
*                   lat: float,
*                   long: float
*              }
* @post-condition:
*              Google Map API response object
* @description:
*              Get latitude and longitude from the request paramters.
*              Validate latitude and longitude whether they are float or not.
*              If not, throw error.
*              Call the Google Map API with location(latitude, longitude), radius(fixed to 1500m), type(fixed to restaurant), and API key(in env).
*              Respond with a result received from the Google API.
* @param:
*              lat: float
*              long: float
* @return:
*              JSON
*/
const restaurantsWithLocation = async (req, res) => {
    const {lat, long} = req.params;
    if (!lat) {
        res.status(400).send("latitude is undefined.");
        return;
    }

    if (!long) {
        res.status(400).send("longitude is undefined.");
        return;
    }

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
        open_now: x.opening_hours.open_now,
        photos: x.photos,
        rating: x.rating
    }));
    // Not need to sort, just save top rated restaurant
    mappedResults.sort(compareRating);
    mappedResults[0].save().catch((err) => console.log(err));
    // Able to send object instead of json object
    // send Status code
    res.send(JSON.stringify(mappedResults));
}

/*
* @title:
*              Compare ratings of two restaurants and decide which rating is greater.
* @pre-condition:
*              Two Restaurant objects should be passed.
* @post-condition:
*              Return 0 when ratings of both restaurants are same.
*              Return negative when a rating of restaurant a is greater.
*              Return positive when a rating of restaurant b is greater.
* @description:
*              Receive two variables a, b (Restaurant objects).
*              Subtract rating of a from rating of b.
*              Return the result.
* @param:
*              a: Restaurant object
*              b: Restaurant object
* @return:
*              float
*/
function compareRating(a, b) {
    return b.rating - a.rating;
}

module.exports = {
    restaurantsWithLocation,
    geoLocation
}
