const axios = require('axios');
const { checkObjectExistsById } = require('../utilities/databaseUtility');
const { saveAndReturnResponse } = require('../utilities/controllerUtility');
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
const getGeoLocation = async (req, res) => {
    const geoRes = await axios.post(process.env.GEOMETRY, {},
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
*                   input: string
*              }
* @post-condition:
*              Google Map API response object
* @description:
*              Get input(name of location) from the request paramters.
*              Validate input whether their value exist or not.
*              If not, throw error.
*              Call the Google Map API with input, inputtype(fixed to textquery), fields(fixed to formatted_address,geometry), and API key(in env).
*              Get latitude, lonagitude, and formatted address from the response.
*              Call function to get one top rated restaurant and 19 nearby restaurants.
*              Convert the result to Restaurant schema.
*              Get the highest rate restaurant.
*              Cehck whether the highest rate restaurant in MongoDB.
*                   if exist, display "Object exists".
*                   if not, save it to MongoDB.
*              Remove the highest rate restaurant from the result.
*              Respond with the formatted address, the results received from the Google API and id of the top rated restaurant.
* @param:
*              input: string
* @return:
*              JSON with status 200
*/
const getRestaurantsWithLocationName = async (req, res) => {
    const { input } = req.params;
    if (!input || input.length <= 0) {
        res.status(400).send("location name is undefined.");
        return;
    }

    const placeRes = await axios.get(process.env.PLACE,
    {
        params:
        {
            input: input,
            inputtype: 'textquery',
            fields: 'formatted_address,geometry',
            key: process.env.API_KEY
        }
    });
    const { candidates } = placeRes.data;

    if(!candidates) {
        return res.status(400).send("Place::Some values are invalid. Please try it again");
    }

    const { formatted_address, geometry } = candidates[0];
    const { lat, lng } = geometry.location;

    const temp = await saveAndReturnResponse(lat, lng);

    res.status(200).json(temp);
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
// const getTopRestaurant = async (req, res) => {
//     const { id } = req.params;
//     const topRestaurant = await checkObjectExistsById(id);

//     if(!topRestaurant)
//     {
//         res.status(400).send("Invalid id, object not found.");
//     }
//     res.status(200).json(topRestaurant);
// }

module.exports = {
    getGeoLocation,
    getRestaurantsWithLocationName,
    // getRestaurantsWithGeo,
    // getTopRestaurant
}
