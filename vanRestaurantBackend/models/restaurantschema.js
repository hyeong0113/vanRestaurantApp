const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
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
        type: Boolean,
        default: false
    },
    permanently_closed: {
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
    }
});
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;