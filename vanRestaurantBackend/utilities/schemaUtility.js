const Restaurant = require("../models/restaurantschema");
const  { getPhotoByReference } = require("../utilities/photoUtility");

async function convertToRestaurantSchemaList(results)
{
    const mappedResults = [];

    for(const elem of results)
    {
        const photo = await getPhotoByReference(elem.photos[0].photo_reference);
        const { place_id, business_status, name, rating } = elem;
        const { lat, lng } = elem.geometry.location;
        const { open_now } = elem.opening_hours;

        if(!place_id || !business_status || !lat || !lng || !name) {
            return null;
        }

        mappedResults.push(
            new Restaurant({
                id: place_id,
                business_status: business_status,
                location: {
                    lat: lat,
                    lng: lng
                },
                name: name,
                open_now: open_now,
                photo: photo,
                rating: rating
            })
        );
    }

    return mappedResults;
}

module.exports = {
    convertToRestaurantSchemaList
}; 