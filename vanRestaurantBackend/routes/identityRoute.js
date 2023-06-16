var express = require('express');
const router = express.Router();
const { signUp, logIn, logOut, checkGoogleEmailRegistered } = require('../controllers/identityController');
const { userValidator } = require('../validators/authValidator');

router.post('/identity/login', logIn);
router.post('/identity/signup', signUp);
router.post('/identity/logout', userValidator, logOut);
router.post('/identity/google/check', checkGoogleEmailRegistered);

module.exports = router;