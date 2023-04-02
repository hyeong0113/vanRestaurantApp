var express = require('express');
const { signUp, logIn, checkCookie } = require('../controllers/identityController');
const router = express.Router();

router.post('/identity/login', logIn);
router.post('/identity/signup', signUp);
router.get('/identity/test', checkCookie);
// TODO: Implement logout

module.exports = router;