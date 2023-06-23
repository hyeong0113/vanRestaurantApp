const axios = require('axios');
const { saveObjectToDB } = require('./databaseUtility');
const { convertToRestaurantSchemaList, convertToTopRestaurant } = require('./schemaUtility');
const TopRestaurant = require('../models/topRestaurantSchema');
require('dotenv').config();

const saveAndReturnResponse = async(lat, long, user, favoriteRestaurants) => {

    const mapRes = await axios.get(process.env.NEARBY,
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

    for(const elem of mappedResults) {
        var detail = await fetchPlaceDetail(elem.placeId);
        elem.address = detail.formatted_address;
        elem.url = detail.url;
    }

    if(mappedResults.length <= 0) {
        return null;
    }

    const topRatedRestaurant = mappedResults.reduce((max, obj) => {
        return obj.rating > max.rating ? obj : max;
    });

    if(user) {
        let found = await user.topRestaurants.find(r => r.placeId === topRatedRestaurant.placeId);

        if(!found) {
            const convertedTopRestaurant = convertToTopRestaurant(topRatedRestaurant);
    
            convertedTopRestaurant.userId = user._id;
        
            convertedTopRestaurant.save(function(err) {
                if (err) throw err;
                console.log('Create::TopRestaurant::Top restaurant saved!');
            });
        
            user.topRestaurants.push(convertedTopRestaurant);
            user.save(function(err) {
                if (err) throw err;
                console.log('Create::TopRestaurant::Top restaurant save to user!');
            });
        }
    }

    const index = mappedResults.findIndex(obj => obj === topRatedRestaurant);

    const removedObject = mappedResults.splice(index, 1);

    const sortedResult = [...removedObject, ...mappedResults];
    sortedResult[0].isTop = true;

    if(favoriteRestaurants !== null && favoriteRestaurants.length > 0) {
        const updatedResult = sortedResult.map((r) => {
            const index = favoriteRestaurants.findIndex((f) => f.placeId === r.placeId);
            if (index !== -1) {
                r.isFavorite = true;
                return r;
            }
            else {
                return r;
            }
        });
        return updatedResult;
    }

    return sortedResult;
}

const fetchPlaceDetail = async (placeId) => {
    const detail = await axios.get(process.env.DETAIL,
        {
            params:
            {
                place_id: placeId,
                key: process.env.API_KEY
            }
    });
    const { result } = detail.data;

    return result;
}

const populateTopRestaurants = async(user, res) => {
    try {
        var populatedUser = await user.populate('topRestaurants');
    }
    catch(err) {
        throw res.status(500).json(err);
    }
    return populatedUser;
}

const populateAllRestaurants = async(user, res) => {
    try {
        var populatedUser = await user.populate('topRestaurants');
        var temp = await populatedUser.populate('favoriteRestaurants', 'placeId');
    }
    catch(err) {
        console.log(err);
        throw res.status(500).json(err);
    }
    return temp;
}

module.exports = {
    saveAndReturnResponse,
    populateTopRestaurants,
    populateAllRestaurants
}
