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
    if(req.session.token) {
        const { token, placeId } = req.body;
        if(req.session.token !== token) {
            throw res.status(403).json({ message: "Unvalid action.", success: false });
        }
        const { id } = jwt.verify(req.session.token, process.env.JWT_SECRET, function(err, decoded) {
            if(err) {
              console.log('Error decoding token:', err);
            }
            return decoded;
        });
        const user = await User.findOne({ _id: id }).populate('favoriteRestaurants');
        const deleteFavoriteRestaurant = user.favoriteRestaurants.find(r => r.placeId === placeId);

        if(deleteFavoriteRestaurant) {
            await FavoriteRestaurant.findOneAndRemove({ _id: deleteFavoriteRestaurant._id, userId: id });
            user.favoriteRestaurants.pull(deleteFavoriteRestaurant);
            await user.save();
            console.log('Favorite restaurant deleted successfully.');
            res.status(200).json({ message: "Favorite restaurant deleted", success: true });
        } else {
            console.log('Favorite restaurant not found.');
            res.status(200).json({ message: "Favorite restaurant not found", success: false });
        }

    }
    else {
        res.status(403).json({ message: "Unauthorized action. Need to login first!", success: false });
    }
}

const deleteAllFavoriteRestaurants = async (req, res) => {
    if(req.session.token) {
        const { token } = req.body;
        if(req.session.token !== token) {
            throw res.status(403).json({ message: "Unvalid action.", success: false });
        }
        const { id } = jwt.verify(req.session.token, process.env.JWT_SECRET, function(err, decoded) {
            if(err) {
              console.log('Error decoding token:', err);
            }
            return decoded;
        });

        try {
            const user = await User.findOne({ _id: id }).populate('favoriteRestaurants');
            await FavoriteRestaurant.deleteMany({ userId: id });
            user.favoriteRestaurants = [];
            await user.save();
            console.log('Favorite restaurant deleted successfully.');
            res.status(200).json({ message: "All favorite restaurants deleted", success: true });
        }
        catch(err) {
            res.status(403).json({ message: err, success: false });
        }

    }
    else {
        res.status(403).json({ message: "Unauthorized action. Need to login first!", success: false });
    }
}

module.exports = {
    getFavoriteRestaurantsByUserId,
    createFavoriteRestaurant,
    deleteFavoriteRestaurantByPlaceId,
    deleteAllFavoriteRestaurants
}