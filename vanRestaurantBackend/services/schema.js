const Restaurant = require("../models/restaurantResponse");

function convertToRestaurantSchemaList(results)
{
    const mappedResults = results.map(x => new Restaurant({
        id: x.place_id,
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
    return mappedResults;
}

module.exports = {
    convertToRestaurantSchemaList
};