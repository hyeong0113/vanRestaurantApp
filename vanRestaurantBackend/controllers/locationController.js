const axios = require('axios');
const { saveAndReturnResponse, populateAllRestaurants } = require('../utilities/topRestaurantUtility');
require('dotenv').config();

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
    const { input } = req.body;
    if(!input || input.length <= 0) {
        return res.status(400).json({ message: "Search::location name is undefined.", success: false});
    }

    const placeRes = await axios.get(process.env.PLACE,
    {
        params:
        {
            input: input,
            inputtype: 'textquery',
            type: 'restaurant',
            fields: 'formatted_address,geometry',
            key: process.env.API_KEY
        }
    });
    const { candidates } = placeRes.data;

    if(!candidates || candidates.length <= 0) {
        return res.status(400).json({ message: "Search::Some values are invalid. Please try it again.", success: false});
    }

    const { geometry } = candidates[0];
    const { lat, lng } = geometry.location;

    const { user } = req;
    let populatedUser = null;
    let savedFavoriteRestaurants = null;
    if(user && user.isLoggedIn) {
        populatedUser = await populateAllRestaurants(user, res);
        const { favoriteRestaurants } = populatedUser;
        savedFavoriteRestaurants = favoriteRestaurants;
    }

    const response = await saveAndReturnResponse(lat, lng, populatedUser, savedFavoriteRestaurants);

    if(response == null) {
        return res.status(400).json({ message: "Search::There are no restaurants. Please try other locations.", success: false});
    }
    res.status(200).json({ response: response, success: true});
}

module.exports = {
    getGeoLocation,
    getRestaurantsWithLocationName,
}
