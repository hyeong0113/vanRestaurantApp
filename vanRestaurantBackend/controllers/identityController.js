const axios = require('axios');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require('../models/userSchema');
const { resolveSoa } = require('dns');

const signUp = async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword)
    {
        res.status(403).json({ message: "Password is not matched!" });
        return;
    }

    if(await User.findOne({ email: email }))
    {
        res.status(403).json({ message: "Email is already registered!" });
        return;
    }

    const newUser = new User({ userName, email, password });
  
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.roles = 'user'
        newUser.save()
          .then(user => {
            res.status(200).json({ message: "Welcome to NearBy!", success: true });
          })
          .catch(err => res.status(500).json({ message: err.message, success: false })); // Make object format for this
      });
    });
}

const logIn = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ message: 'User not found' });
    
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });
                    req.session.token = token;
                    res.json({ token });
                } else {
                    return res.status(400).json({ message: 'Incorrect password' });
                }
            });
      })
      .catch(err => res.status(500).json({ message: err.message }));
}

const checkCookie = (req, res) => {
    if(req.session) {
        res.status(200).json({ response: req.session.token });
        return;
    }
    res.status(500).error({ response: "NOT STORED" });
}

module.exports = {
    signUp,
    logIn,
    checkCookie
}