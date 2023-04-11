const jwt = require('jsonwebtoken');
const joi = require('joi');
const User = require('../models/userSchema');

const locationValidator = {
    getRestaurants : joi.object({
        lat: joi.string().pattern(/[+-]?([0-9]*[.])?[0-9]+$/).required().error(() => new Error('latitude should be number', 'lat')),
        long: joi.string().pattern(/[+-]?([0-9]*[.])?[0-9]+$/).required().error(() => new Error('longitude should be number', 'long'))
    })
};

const tokenValidatorForLocation = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      console.log("Token is not provided. Top Restaurant will not be saved");
      req.user = null;
      return next();
    }
  
    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(err) {
      return res.status(400).json({ message: err.message, success: false });
    }
  
    try {
      var user = await User.findOne({ _id: decoded.id });
      if(!user) {
          return res.status(400).json({ message: "User not found", success: false });
      }
    }
    catch(err) {
      return res.status(400).json({ message: err.message, success: false });
    }
    req.user = user;
    next();
  }

module.exports = {
    locationValidator,
    tokenValidatorForLocation
};