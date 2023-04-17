const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const tokenValidator = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Token is not provided. Need to login first", success: false });
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
  tokenValidator
}