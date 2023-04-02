const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ['admin', 'user'],
        default: 'guest'
    },
    topRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TopRestaurant'
        }
    ],
    favoriteRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FavoriteRestaurant'
        }
    ], 
});
const User = mongoose.model('User', userSchema);
module.exports = User;