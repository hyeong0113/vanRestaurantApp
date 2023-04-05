const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');
require('dotenv').config();

const getTopRestaurantsByUserId = (req, res) => {
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

        User.findOne({ _id: id })
            .populate('topRestaurants')
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

module.exports = {
    getTopRestaurantsByUserId
}