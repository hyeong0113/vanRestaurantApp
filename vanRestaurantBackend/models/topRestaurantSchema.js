const mongoose = require('mongoose');
const Restaurant = require('./restaurantSchema');

const topRestaurantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const TopRestaurant =  Restaurant.discriminator('TopRestaurant', topRestaurantSchema);

module.exports = TopRestaurant;