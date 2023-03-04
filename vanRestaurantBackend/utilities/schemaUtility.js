const Restaurant = require("../models/restaurantschema");
const  { getPhotoByReference } = require("../utilities/photoUtility");

async function convertToRestaurantSchemaList(results)
{
    const mappedResults = [];

    for(const elem of results)
    {
        const photo = await getPhotoByReference(elem.photos[0].photo_reference);
        const { place_id, business_status, name, rating, opening_hours } = elem;
        let permanently_closed = false;
        const { lat, lng } = elem.geometry.location;
        let open_now = false;

        if(elem.permanently_closed !== undefined) {
            permanently_closed = true;
        }

        if(opening_hours !== undefined) {
            open_now = opening_hours.open_now;
        }

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
                permanently_closed: permanently_closed,
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