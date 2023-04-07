const axios = require('axios');
const { saveObjectToDB } = require('./databaseUtility');
const { convertToRestaurantSchemaList, convertToTopRestaurant } = require('./schemaUtility');
const TopRestaurant = require('../models/topRestaurantSchema');
require('dotenv').config();

const saveAndReturnResponse = async(lat, long, user) => {

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
                console.log('Top restaurant saved!');
            });
        
            user.topRestaurants.push(convertedTopRestaurant);
            user.save(function(err) {
                if (err) throw err;
                console.log('Top restaurant save to user!');
            });
        }
    }

    const index = mappedResults.findIndex(obj => obj === topRatedRestaurant);

    const removedObject = mappedResults.splice(index, 1);

    const sortedResult = [...removedObject, ...mappedResults];
    sortedResult[0].isTop = true;

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

async function checkObjectExistsById(id) {
    try {
        const result = await TopRestaurant.findOne({ id: id }).catch((error) => {
            console.error(error);
        });
         
        return result;
      } catch (error) {
        console.error(error);
    }
}

async function saveTopRestaurant(data) {
    await checkObjectExistsById(data.id)
        .then(async(result) => {
            if (result) {
                console.log('Object exists');
            } else {
                await data.save().catch((err) => console.log(err));
            }
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
        return data.id;
}


module.exports = {
    saveAndReturnResponse
}