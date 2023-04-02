const mongoose = require('mongoose');
const Restaurant = require('./restaurantSchema');

const favoriteRestaurantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const FavoriteRestaurant =  Restaurant.discriminator('FavoriteRestaurant', favoriteRestaurantSchema);

module.exports = FavoriteRestaurant;