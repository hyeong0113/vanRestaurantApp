const axios = require('axios');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require('../models/userSchema');

const signUp = async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword)
    {
        res.status(403).json({ error: "Password is not matched!" });
        return;
    }

    if(await User.findOne({ email: email }))
    {
        res.status(403).json({ error: "Email is already registered!" });
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
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ token });
          })
          .catch(err => res.status(500).json({ error: err.message }));
      });
    });
}

const logIn = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ error: 'User not found' });
    
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                    res.json({ token });
                } else {
                    return res.status(400).json({ error: 'Incorrect password' });
                }
            });
      })
      .catch(err => res.status(500).json({ error: err.message }));
}

module.exports = {
    signUp,
    logIn
}