const mongoose = require("mongoose");
const Restaurantschema = new mongoose.Schema({
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
    photo: {
        type: String
    },    
    rating: {
        type: Number
    }
});
const Restaurant = mongoose.model("Restaurant", Restaurantschema);
module.exports = Restaurant;