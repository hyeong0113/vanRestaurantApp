const FavoriteRestaurant = require('../models/favoriteRestaurantSchema');
const { saveFavoriteRestaurant, populateFavoriteRestaurants } = require('../utilities/favoriteRestaurantUtility');
require('dotenv').config();

const getFavoriteRestaurantsByUser = async(req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateFavoriteRestaurants(user, res);
        const { favoriteRestaurants } = populatedUser;
        return res.status(200).json({ response: favoriteRestaurants, success: true });
    }
    else {
        return res.status(403).json({ message: "Get::FavoriteRestaurant::Unauthorized action. Please log in first.", success: false });
    }
}

const createFavoriteRestaurant = async (req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateFavoriteRestaurants(user, res);
        const { favoriteRestaurant } = req.body;
        const response = await saveFavoriteRestaurant(favoriteRestaurant, populatedUser);
        return res.status(200).json({ response: response, success: true });
    }
    else {
        return res.status(403).json({ message: "Get::FavoriteRestaurant::Unauthorized action. Please log in first.", success: false });
    }
}
    

const deleteFavoriteRestaurantByPlaceId = async (req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateFavoriteRestaurants(user, res);
        const { placeId } = req.body;

        const deleteFavoriteRestaurant = populatedUser.favoriteRestaurants.find(r => r.placeId === placeId);
    
        if(deleteFavoriteRestaurant) {
            await FavoriteRestaurant.findOneAndRemove({ _id: deleteFavoriteRestaurant._id, userId: populatedUser._id });
            populatedUser.favoriteRestaurants.pull(deleteFavoriteRestaurant);
            await populatedUser.save();
            console.log('DeleteById::Favorite restaurant deleted successfully.');
            res.status(200).json({ message: "DeleteById::FavoriteRestaurant::Favorite restaurant deleted", success: true });
        } else {
            console.log('DeleteById::Favorite restaurant not found.');
            res.status(200).json({ message: "DeleteById::FavoriteRestaurant::Favorite restaurant not found", success: false });
        }
    }
    else {
        return res.status(403).json({ message: "DeleteById::FavoriteRestaurant::Unauthorized action. Please log in first.", success: false });
    }
}

const deleteAllFavoriteRestaurants = async (req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateFavoriteRestaurants(user, res);
        try {
            await FavoriteRestaurant.deleteMany({ userId: populatedUser._id });
            populatedUser.favoriteRestaurants = [];
            await populatedUser.save();
            console.log('DeleteAll::Favorite restaurant deleted successfully.');
            res.status(200).json({ message: "DeleteAll::FavoriteRestaurant::All favorite restaurants deleted", success: true });
        }
        catch(err) {
            res.status(400).json({ message: `DeleteAll::FavoriteRestaurant::${err}`, success: false });
        }
    }
    else {
        return res.status(403).json({ message: "DeleteAll::FavoriteRestaurant::Unauthorized action. Please log in first.", success: false });
    }
}

module.exports = {
    getFavoriteRestaurantsByUser,
    createFavoriteRestaurant,
    deleteFavoriteRestaurantByPlaceId,
    deleteAllFavoriteRestaurants
}