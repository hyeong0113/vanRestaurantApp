const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurant");

const favoriteRestaurantSchema = Restaurant.discriminator('FavoriteRestaurant', new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));

const FavoriteRestaurant =  mongoose.model('FavoriteRestaurant');

module.exports = FavoriteRestaurant;