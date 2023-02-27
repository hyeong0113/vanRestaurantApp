const mongoose = require("mongoose");
const RestaurantResponseSchema = new mongoose.Schema({
    id: {
        type: String
    },
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
    open_now: {     
        type: Boolean
    },
    // photos: [{
    //     name: { type: String, required: true },
    //     data: { type: Buffer, required: true },
    //     contentType: { type: String, required: true }
    // }],
    photos: [],    
    rating: {
        type: Number
    }
});
const Restaurant = mongoose.model("Restaurant", RestaurantResponseSchema);
module.exports = Restaurant;