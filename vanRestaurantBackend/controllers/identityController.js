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
        return res.status(500).json({ message: err.message, success: false });
    }

    newUser.roles = 'user';

    try {
        const saved = await newUser.save();
        console.log(saved.email);
        return res.status(200).json({ message: "Welcome to NearBy!", success: true });
    }
    catch(err) {
        return res.status(500).json({ message: err.message, success: false });
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body;
    let user = null;
    try {
        user = await User.findOne({ email })
        if(user === null) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
    }
    catch(err) {
        return res.status(500).json({ message: err.messsage, success: false });
    }

    try {
        const matched = await bcrypt.compare(password, user.password);
        if(!matched) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
    }
    catch(err) {
        return res.status(400).json({ message: err.message, success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    return res.json({ token: token, success: true });
}

const logOut = (req, res) => {
    // res.clearCookie('token');
    // return res.status(200).send({ message: "You've been signed out!" });
    const { token } = req.body;
    console.log(token);
    console.log("logOut::token: ", token);
    console.log("logOut::req.session.token 00: ", req.cookies.token);
    if(req.cookies.token !== token) {
        console.log("req.session.token 11:: ", req.cookies.token);
        const temp = req.cookies.token;
        throw res.status(403).json({ message: "Invalid action", success: false, temp });
    }
    console.log("req.session.token 22:: ", req.cookies.token);
    try {
        // req.session = null;
        res.clearCookie('token');
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        res.status(403).err({ message: err, success: false });
    }
}

const checkGoogleEmailRegistered = async (req, res) => {
    const { email } = req.body;
    const user = await checkUserExistsByEmail(email);

    if(user) {
        return res.status(200).send({ message: "Given Google email is already registered!", registered: true });
    }
    return res.status(200).send({ message: "Given Google email is not registered yet!", registered: false });
}

const checkCookie = (req, res) => {
    if(req.cookies.token) {
        res.status(200).json({ message: "User logged in!", response: true, token: req.cookies.token });
        return;
    }
    res.status(200).json({ message: "User not logged in!", response: false });
}

module.exports = {
    signUp,
    logIn,
    logOut,
    checkGoogleEmailRegistered,
    checkCookie
}

//