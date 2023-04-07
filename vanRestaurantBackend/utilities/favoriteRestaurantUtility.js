const FavoriteRestaurant = require('../models/favoriteRestaurantSchema');
const convertToFavoriteRestaurant = require('./schemaUtility');

require('dotenv').config();


const saveFavoriteRestaurant = async (favoriteRestaurant, user) => {
    let found = await user.favoriteRestaurants.find(r => r.placeId === favoriteRestaurant.placeId);
    if(!found) {
        const convertedFavoriteRestaurant = convertToFavoriteRestaurant(favoriteRestaurant);
        
        convertedFavoriteRestaurant.userId = user._id;

        convertedFavoriteRestaurant.save(function(err) {
            if(err) {
                return { message: err, success: false }
            }
            console.log('Favorite restaurant saved!');
            return { message: "Favorite restaurant saved!", success: true }
        });

        user.favoriteRestaurants.push(convertedFavoriteRestaurant);
        user.save(function(err) {
            if(err) {
                return { message: err, success: false }
            }
            console.log('Favorite restaurant save to user!');
            return { message: "Favorite restaurant save to user!", success: true }
        });
    }
    return { message: "Favorite restaurant exist!", success: true }
}

module.exports = {
    saveFavoriteRestaurant
}