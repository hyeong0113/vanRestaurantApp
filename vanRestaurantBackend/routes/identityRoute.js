var express = require('express');
const { signUp, logIn } = require('../controllers/identityController');
const router = express.Router();

router.post('/login', logIn);
router.post('/signup', signUp);
// TODO: Implement logout

module.exports = router;