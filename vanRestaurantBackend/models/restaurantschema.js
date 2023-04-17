const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
    placeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    businessStatus: {
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
    openNow: {     
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        required: false
    },    
    rating: {
        type: Number,
        required: false
    },
    url: {
        type: String,
        required: true
    }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;