const axios = require('axios');
const { saveObjectToDB, checkObjectExistsById } = require('../utilities/databaseUtility');
const { convertToRestaurantSchemaList } = require('../utilities/schemaUtility');
require('dotenv').config()

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
*              Convert the result to Restaurant schema.
*              Get the highest rate restaurant.
*              Cehck whether the highest rate restaurant in MongoDB.
*                   if exist, display "Object exists".
*                   if not, save it to MongoDB.
*              Remove the highest rate restaurant from the result.
*              Respond with the result received from the Google API and id of the top rated restaurant.
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
    const mappedResults = await convertToRestaurantSchemaList(results);

    if(!mappedResults) {
        return res.status(400).send("Some values are invalid. Please try it again");
    }

    if(mappedResults.length <= 0) {
        return res.status(404).send("There are no restaurants!");
    }
    
    const topRatedRestaurant = mappedResults.reduce((max, obj) => {
        return obj.rating > max.rating ? obj : max;
    });

    const topId = await saveObjectToDB(topRatedRestaurant);

    if(!topId) {
        return res.status(400).send("Some values are invalid. Please try it again");
    }
    
    const filteredResults = mappedResults.filter(obj => obj !== topRatedRestaurant);

    res.status(200).json(
        {
            topId: topId,
            results: filteredResults
        }
    );
}

/*
* @title:
*              Get a stored top restaurant from Mongo DB.
* @pre-condition:
*              parameters: {
*                   id: string
*              }
* @post-condition:
*              Google Map API response object
* @description:
*              Get id from the request paramters.
*              Call checkObjectExistsById(id) to get the top rated restaurant from Mongo DB.
*              If the restaurant does not exist, send error message with status 400.
*              If exists, send the response with status 200.
* @param:
*              id: string
* @return:
*              JSON with status 200
*/
const getTopRestaurant = async (req, res) => {
    const { id } = req.params;
    const topRestaurant = await checkObjectExistsById(id);
    if(!topRestaurant)
    {
        res.status(400).send("Invalid id, object not found.");
    }
    res.status(200).json(topRestaurant);
}

module.exports = {
    restaurantsWithLocation,
    geoLocation,
    getTopRestaurant
}
