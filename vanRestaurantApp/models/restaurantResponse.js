const mongoose = require("mongoose");
const RestaurantResponseSchema = new mongoose.Schema({
    business_status: {
        type: String,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    name: {
        type: String,
        required: true,
    },
    opening_hours: {     
        type: Boolean
    },
    photos: [],
    rating: {
        type: Number
    }
});
const Restaurant = mongoose.model("Restaurant", RestaurantResponseSchema);
module.exports = Restaurant;