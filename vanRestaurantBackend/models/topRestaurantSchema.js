const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurant");

const topRestaurantSchema = Restaurant.discriminator('TopRestaurant', new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));

const TopRestaurant =  mongoose.model('TopRestaurant');

module.exports = TopRestaurant;