const RestaurantDto = require('../dtos/restaurantDto');
const TopRestaurant = require('../models/topRestaurantSchema');
const  { getPhotoByReference } = require("../utilities/photoUtility");

require('dotenv').config();

const convertToRestaurantSchemaList = async (results) => {
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

        mappedResults.push(new RestaurantDto(elem, open_now, photo));
    }

    return mappedResults;
}

const convertToTopRestaurant = (topRestaurant) => {
    return new TopRestaurant ({
        placeId: topRestaurant.placeId,
        name: topRestaurant.name,
        address: topRestaurant.address,
        businessStatus: topRestaurant.businessStatus,
        location: topRestaurant.location,
        openNow: topRestaurant.openNow,
        photo: topRestaurant.photo,
        rating: topRestaurant.rating,
        url: topRestaurant.url
    });
}



module.exports = {
    convertToRestaurantSchemaList,
    convertToTopRestaurant
}; 