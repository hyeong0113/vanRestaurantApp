const axios = require('axios');
const { saveObjectToDB } = require('../utilities/databaseUtility');
const { convertToRestaurantSchemaList } = require('../utilities/schemaUtility');
require('dotenv').config()

const saveAndReturnResponse = async(res, lat, long) => {
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

    if(!mappedResults) {
        return res.status(400).send("Restaurants::Some values are invalid. Please try it again");
    }

    if(mappedResults.length <= 0) {
        return res.status(404).send("There are no restaurants!");
    }
    
    const topRatedRestaurant = mappedResults.reduce((max, obj) => {
        return obj.rating > max.rating ? obj : max;
    });

    const topId = await saveObjectToDB(topRatedRestaurant);

    if(!topId) {
        return res.status(400).send("Restaurants::Some values are invalid. Please try it again");
    }
    
    const filteredResults = mappedResults.filter(obj => obj !== topRatedRestaurant);

    return { topId, filteredResults };
}

module.exports = {
    saveAndReturnResponse
}