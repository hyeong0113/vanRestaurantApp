const FavoriteRestaurant = require('../models/favoriteRestaurantSchema');
const { saveFavoriteRestaurant, populateFavoriteRestaurants } = require('../utilities/favoriteRestaurantUtility');
require('dotenv').config();

const getFavoriteRestaurantsByUserId = async(req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateFavoriteRestaurants(user);
        return res.status(200).json(populatedUser);
    }
    else {
        return res.status(401).json({ message: "Unauthorized action. Please log in first.", success: false });
    }
}

const createFavoriteRestaurant = async (req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateFavoriteRestaurants(user);
        const { favoriteRestaurant } = req.body;
        const response = await saveFavoriteRestaurant(favoriteRestaurant, populatedUser);
        return res.status(200).json(response);
    }
    else {
        return res.status(401).json({ message: "Unauthorized action. Please log in first.", success: false });
    }
}
    

const deleteFavoriteRestaurantByPlaceId = async (req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateFavoriteRestaurants(user);
        const { placeId } = req.body;

        const deleteFavoriteRestaurant = populatedUser.favoriteRestaurants.find(r => r.placeId === placeId);
    
        if(deleteFavoriteRestaurant) {
            await FavoriteRestaurant.findOneAndRemove({ _id: deleteFavoriteRestaurant._id, userId: populatedUser._id });
            populatedUser.favoriteRestaurants.pull(deleteFavoriteRestaurant);
            await populatedUser.save();
            console.log('Favorite restaurant deleted successfully.');
            res.status(200).json({ message: "Favorite restaurant deleted", success: true });
        } else {
            console.log('Favorite restaurant not found.');
            res.status(200).json({ message: "Favorite restaurant not found", success: false });
        }
    }
    else {
        return res.status(401).json({ message: "Unauthorized action. Please log in first.", success: false });
    }
}

const deleteAllFavoriteRestaurants = async (req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateFavoriteRestaurants(user);
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
    else {
        return res.status(401).json({ message: "Unauthorized action. Please log in first.", success: false });
    }
}

module.exports = {
    getFavoriteRestaurantsByUserId,
    createFavoriteRestaurant,
    deleteFavoriteRestaurantByPlaceId,
    deleteAllFavoriteRestaurants
}