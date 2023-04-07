const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurant");

const favoriteRestaurantSchema = Restaurant.discriminator('FavoriteRestaurant', new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));

const FavoriteRestaurant =  Restaurant.discriminator('FavoriteRestaurant');

module.exports = FavoriteRestaurant;