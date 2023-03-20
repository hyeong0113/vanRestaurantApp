const mongoose = require('mongoose');
const Restaurant = require('./restaurantSchema');

const favoriteRestaurantSchema = new mongoose.Schema({
});

const FavoriteRestaurant =  Restaurant.discriminator('FavoriteRestaurant', favoriteRestaurantSchema);

module.exports = FavoriteRestaurant;