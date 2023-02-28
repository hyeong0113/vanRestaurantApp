const Restaurant = require("../models/restaurantschema");
const  { getPhotoByReference } = require("../utilities/photoUtility");

async function convertToRestaurantSchemaList(results)
{
    // return mappedResults = await Promise.all(results.map(async(x) => {
    //     const photo = await getPhotoByReference(x.photos[0].photo_reference);
    //         new Restaurant({
    //             id: x.place_id,
    //             business_status: x.business_status,
    //             location: {
    //                 lat: x.geometry.location.lat,
    //                 lng: x.geometry.location.lng
    //             },
    //             name: x.name,
    //             open_now: x.opening_hours.open_now,
    //             photo: photo,
    //             rating: x.rating
    //         })
    // }));

    const mappedResults = [];

    for(const elem of results)
    {
        const photo = await getPhotoByReference(elem.photos[0].photo_reference);

        mappedResults.push(
            new Restaurant({
                id: elem.place_id,
                business_status: elem.business_status,
                location: {
                    lat: elem.geometry.location.lat,
                    lng: elem.geometry.location.lng
                },
                name: elem.name,
                open_now: elem.opening_hours.open_now,
                photo: photo,
                rating: elem.rating
            })
        );
    }

    return mappedResults;
}

module.exports = {
    convertToRestaurantSchemaList
}; 