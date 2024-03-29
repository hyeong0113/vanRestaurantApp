const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');
const TopRestaurant = require('../models/topRestaurantSchema');
const { populateTopRestaurants } = require('../utilities/topRestaurantUtility');
require('dotenv').config();

const getTopRestaurantsByUser = async(req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateTopRestaurants(user, res);
        const { topRestaurants } = populatedUser;
        return res.status(200).json({ response: topRestaurants, success: true });
    }
    else {
        return res.status(401).json({ message: "Get::TopRestaurant::Unauthorized action. Please log in first.", success: false });
    }
}

const deleteTopRestaurantByPlaceId = async (req, res) => {
    const { user } = req;

    if(user.isLoggedIn) {
        const populatedUser = await populateTopRestaurants(user, res);
        const { placeId } = req.body;

        const deleteTopRestaurant = populatedUser.topRestaurants.find(r => r.placeId === placeId);

        if(deleteTopRestaurant) {
            await TopRestaurant.findOneAndRemove({ _id: deleteTopRestaurant._id, userId: populatedUser._id });
            populatedUser.topRestaurants.pull(deleteTopRestaurant);
            await populatedUser.save();
            console.log('DeleteById::TopRestaurant::Top restaurant deleted successfully.');
            res.status(200).json({ message: "DeleteById::TopRestaurant::Top restaurant deleted", success: true });
        } else {
            console.log('DeleteById::TopRestaurant::Top restaurant not found.');
            res.status(200).json({ message: "DeleteById::TopRestaurant::Top restaurant not found", success: false });
        }
    }
    else {
        res.status(403).json({ message: "Get::TopRestaurant::Unauthorized action. Need to login first!", success: false });
    }
}

const deleteAllTopRestaurants = async (req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateTopRestaurants(user, res);

        try {
            await TopRestaurant.deleteMany({ userId: populatedUser._id });
            populatedUser.topRestaurants = [];
            await populatedUser.save();
            console.log('DeleteAll::TopRestaurant::All top restaurants deleted successfully.');
            res.status(200).json({ message: "DeleteAll::TopRestaurant::All top restaurants deleted", success: true });
        }
        catch(err) {
            res.status(403).json({ message: `DeleteAll::TopRestaurant::${err}`, success: false });
        }

    }
    else {
        res.status(403).json({ message: "DeleteAll::TopRestaurant::Unauthorized action. Need to login first!", success: false });
    }
}

module.exports = {
    getTopRestaurantsByUser,
    deleteTopRestaurantByPlaceId,
    deleteAllTopRestaurants
}