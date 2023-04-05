var express = require('express');
const { signUp, logIn, checkCookie, logOut, checkGoogleEmailRegistered } = require('../controllers/identityController');
const router = express.Router();

router.post('/identity/login', logIn);
router.post('/identity/signup', signUp);
router.get('/identity/logout', logOut);
router.post('/identity/google/check', checkGoogleEmailRegistered);
router.get('/identity/cookie/check', checkCookie);
// TODO: Implement logout

module.exports = router;