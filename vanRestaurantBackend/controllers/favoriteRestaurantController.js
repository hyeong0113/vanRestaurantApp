const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');
const FavoriteRestaurant = require('../models/favoriteRestaurantSchema');
const { saveFavoriteRestaurant } = require('../utilities/favoriteRestaurantUtility');
require('dotenv').config();

const getFavoriteRestaurantsByUserId = async(req, res) => {
    const { user } = req;

    try {
        var populatedUser = await user.populate('favoriteRestaurants');
    }
    catch(err) {
        throw res.status(500).json(error);
    }
    return res.status(200).json(populatedUser);
}

const createFavoriteRestaurant = async (req, res) => {
    const { user } = req;
    const { favoriteRestaurant } = req.body;
    try {
        var populatedUser = await user.populate('favoriteRestaurants');
    }
    catch(err) {
        throw res.status(500).json(error);
    }

    const response = await saveFavoriteRestaurant(favoriteRestaurant, populatedUser);
    return res.status(200).json(response);
}

const deleteFavoriteRestaurantByPlaceId = async (req, res) => {
    const { placeId } = req.body;
    const { user } = req;

    try {
        var populatedUser = await user.populate('favoriteRestaurants');
    }
    catch(err) {
        throw res.status(500).json(error);
    }

    const deleteFavoriteRestaurant = populatedUser.favoriteRestaurants.find(r => r.placeId === placeId);

    if(deleteFavoriteRestaurant) {
        await FavoriteRestaurant.findOneAndRemove({ _id: deleteFavoriteRestaurant._id, userId: user._id });
        user.favoriteRestaurants.pull(deleteFavoriteRestaurant);
        await populatedUser.save();
        console.log('Favorite restaurant deleted successfully.');
        res.status(200).json({ message: "Favorite restaurant deleted", success: true });
    } else {
        console.log('Favorite restaurant not found.');
        res.status(200).json({ message: "Favorite restaurant not found", success: false });
    }
}

const deleteAllFavoriteRestaurants = async (req, res) => {
    const { user } = req;

    try {
        var populatedUser = await user.populate('favoriteRestaurants');
    }
    catch(err) {
        throw res.status(500).json(error);
    }
    
    try {
        await FavoriteRestaurant.deleteMany({ userId: populatedUser._id });
        populatedUser.favoriteRestaurants = [];
        await populatedUser.save();
        console.log('Favorite restaurant deleted successfully.');
        res.status(200).json({ message: "All favorite restaurants deleted", success: true });
    }
    catch(err) {
        res.status(403).json({ message: err, success: false });
    }

}

module.exports = {
    getFavoriteRestaurantsByUserId,
    createFavoriteRestaurant,
    deleteFavoriteRestaurantByPlaceId,
    deleteAllFavoriteRestaurants
}