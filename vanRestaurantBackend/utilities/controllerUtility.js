const axios = require('axios');
const { saveObjectToDB } = require('../utilities/databaseUtility');
const { convertToRestaurantSchemaList } = require('../utilities/schemaUtility');
require('dotenv').config()

const saveAndReturnResponse = async(lat, long) => {
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
        console.log(detail.formatted_address);
        elem.address = detail.formatted_address;
    }


    return mappedResults;
    // if(!mappedResults) {
    //     return res.status(400).send("Restaurants::Some values are invalid. Please try it again");
    // }

    // if(mappedResults.length <= 0) {
    //     return res.status(404).send("There are no restaurants!");
    // }
    
    // const topRatedRestaurant = mappedResults.reduce((max, obj) => {
    //     return obj.rating > max.rating ? obj : max;
    // });

    // const topId = await saveObjectToDB(topRatedRestaurant);

    // if(!topId) {
    //     return res.status(400).send("Restaurants::Some values are invalid. Please try it again");
    // }
    
    // const filteredResults = mappedResults.filter(obj => obj !== topRatedRestaurant);

    // return { topId, filteredResults };
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


module.exports = {
    saveAndReturnResponse
}