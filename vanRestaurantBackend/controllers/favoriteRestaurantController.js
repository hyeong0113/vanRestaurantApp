const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');
const FavoriteRestaurant = require('../models/favoriteRestaurantSchema');
require('dotenv').config();

const getFavoriteRestaurantsByUserId = (req, res) => {
    if(req.session.token) {
        const { token } = req.body;
        if(req.session.token !== token) {
            throw res.status(403).json({ message: "Invalid action", success: false });
        }
        const { id } = jwt.verify(req.session.token, process.env.JWT_SECRET, function(err, decoded) {
            if(err) {
              console.log('Error decoding token:', err);
            }
            return decoded;
        });

        User.findOne({ _id: id })
            .populate('favoriteRestaurants')
            .exec(function(err, user) {
                if(err) {
                    throw res.status(500).json(error);
                }
                res.status(200).json(user);
        });
    }
    else {
        res.status(403).json({ message: "Unauthorized action. Need to login first!", success: false });
    }
}

const createFavoriteRestaurant = async (req, res) => {
    if(req.session.token) {
        const { token, favoriteRestaurant } = req.body;
        if(req.session.token !== token) {
            throw res.status(403).json({ message: "Invalid action", success: false });
        }
        const { id } = jwt.verify(req.session.token, process.env.JWT_SECRET, function(err, decoded) {
            if(err) {
              console.log('Error decoding token:', err);
            }
            return decoded;
        });

        const user = await User.findOne({ _id: id })
                        .then(u => {
                            if (!u) {
                                return res.status(400).json({ message: 'User not found' });
                            }
                            return u.populate('favoriteRestaurants');
                        }).catch(err => res.status(500).json({ message: err.message }));
        
        const response = await saveFavoriteRestaurant(favoriteRestaurant, user);
    }
    else {
        res.status(403).json({ message: "Unauthorized action. Need to login first!", success: false });
    }




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