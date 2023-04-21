const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');
const TopRestaurant = require('../models/topRestaurantSchema');
const { populateTopRestaurants } = require('../utilities/toprestaurantUtility');
require('dotenv').config();

const getTopRestaurantsByUser = async(req, res) => {
    const { user } = req;
    if(user.isLoggedIn) {
        const populatedUser = await populateTopRestaurants(user, res);
        const { topRestaurants } = populatedUser;
        return res.status(200).json(topRestaurants);
    }
    else {
        return res.status(401).json({ message: "Unauthorized action. Please log in first.", success: false });
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
            console.log('Top restaurant deleted successfully.');
            res.status(200).json({ message: "Top restaurant deleted", success: true });
        } else {
            console.log('Top restaurant not found.');
            res.status(200).json({ message: "Top restaurant not found", success: false });
        }
    }
    else {
        res.status(403).json({ message: "Unauthorized action. Need to login first!", success: false });
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
            console.log('All top restaurants deleted successfully.');
            res.status(200).json({ message: "All top restaurants deleted", success: true });
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
    getTopRestaurantsByUser,
    deleteTopRestaurantByPlaceId,
    deleteAllTopRestaurants
}