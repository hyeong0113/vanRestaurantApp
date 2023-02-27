// comment
// - Create basic authentication of each requests
// - Create a validator on the requests, to validate parameters and payload properly v
// - Create and save top 1 restaurant searched from above to MongoDB v
const axios = require('axios');
const { saveObjectToDB, checkObjectExistsById } = require('../services/database');
const { convertToRestaurantSchemaList } = require('../services/schema');
require('dotenv').config()

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
*              JSON with status 200
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
*              Validate latitude and longitude whether their value exist or not.
*              If not, throw error.
*              Call the Google Map API with location(latitude, longitude), radius(fixed to 1500m), type(fixed to restaurant), and API key(in env).
*              Convert the result to Restaurant schema
*              Get the highest rate restaurant
*              Cehck whether the highest rate restaurant in MongoDB.
*                   if exist, display "Object exists"
*                   if not, save it to MongoDB
*              Remove the highest rate restaurant from the result.
*              Respond with the result received from the Google API.
* @param:
*              lat: float
*              long: float
* @return:
*              JSON with status 200
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
    const mappedResults = convertToRestaurantSchemaList(results);
    const topRatedRestaurant = mappedResults.reduce((max, obj) => {
        return obj.rating > max.rating ? obj : max;
    });

    const topdId = await saveObjectToDB(topRatedRestaurant);
    const filteredResults = mappedResults.filter(obj => obj !== topRatedRestaurant);

    // maby save id of top rated restaurant or send it to frontend to get top rated restaurant api
    res.status(200).json(
        {
            topId: topdId,
            results: filteredResults
        }
    );
}

const getTopRestaurant = async (req, res) => {
    const { id } = req.params;
    const topRestaurant = await checkObjectExistsById(id);
    res.status(200).json(topRestaurant);
}

module.exports = {
    restaurantsWithLocation,
    geoLocation,
    getTopRestaurant
}
