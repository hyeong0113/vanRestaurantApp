const mongoose = require('mongoose');
const Restaurant = require('./restaurantSchema');

const topRestaurantSchema = new mongoose.Schema({
});

const TopRestaurant =  Restaurant.discriminator('TopRestaurant', topRestaurantSchema);

module.exports = TopRestaurant;