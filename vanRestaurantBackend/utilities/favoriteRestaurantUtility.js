const FavoriteRestaurant = require('../models/favoriteRestaurantSchema');
const convertToFavoriteRestaurant = require('./schemaUtility');

require('dotenv').config();


const saveFavoriteRestaurant = async (favoriteRestaurant, user) => {
    const convertedFavoriteRestaurant = convertToFavoriteRestaurant(favoriteRestaurant);
    
    convertedFavoriteRestaurant.userId = user._id;

    convertedFavoriteRestaurant.save(function(err) {
        if (err) throw err;
        console.log('Favorite restaurant saved!');
    });

    user.favoriteRestaurants.push(convertedFavoriteRestaurant);
    user.save(function(err) {
        if (err) throw err;
        console.log('Favorite restaurant save to user!');
    });
}

module.exports = {
    saveFavoriteRestaurant
}