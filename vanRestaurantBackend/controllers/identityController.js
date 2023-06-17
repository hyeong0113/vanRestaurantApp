const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require('../models/userSchema');
const { checkUserExistsByEmail } = require('../utilities/identityUtility');

const signUp = async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body;
    if(password !== confirmPassword)
    {
        return res.status(403).json({ message: "Password is not matched!" });
    }

    if(await User.findOne({ email: email }))
    {
        return res.status(403).json({ message: "Email is already registered!" });
    }

    const newUser = new User({ userName, email, password });

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;
    }
    catch(err) {
        throw res.status(500).json({ message: err.message, success: false });
    }

    newUser.roles = 'user';

    try {
        const saved = await newUser.save();
        return res.status(200).json({ message: "Welcome to NearBy!", success: true });
    }
    catch(err) {
        throw res.status(500).json({ message: err.message, success: false });
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        var user = await User.findOne({ email });
        if(user === null) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
    }
    catch(err) {
        throw res.status(500).json({ message: err.messsage, success: false });
    }

    try {
        const matched = await bcrypt.compare(password, user.password);
        if(!matched) {
            return res.status(400).json({ message: "Incorrect password" });
        }
    }
    catch(err) {
        throw res.status(400).json({ message: err.message, success: false });
    }

    user.isLoggedIn = true;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    return res.status(200).json({ message: "Logged in successful!", token: token, loggedIn: user.isLoggedIn , success: true });
}

const logOut = async (req, res) => {
    const { user } = req;

    if(!user.isLoggedIn) {
        return res.status(403).error({ message: "This is user is already logged out!", success: false });
    }
    user.isLoggedIn = false;
    await user.save();

    return res.status(200).json({ message: "Logged out successful!", loggedIn: user.isLoggedIn , success: true });
}

const checkGoogleEmailRegistered = async (req, res) => {
    const { email } = req.body;
    const user = await checkUserExistsByEmail(email);

    if(user) {
        return res.status(200).send({ message: "Given Google email is already registered!", registered: true });
    }
    return res.status(200).send({ message: "Given Google email is not registered yet!", registered: false });
}

module.exports = {
    signUp,
    logIn,
    logOut,
    checkGoogleEmailRegistered
}