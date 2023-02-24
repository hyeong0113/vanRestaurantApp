var express = require('express');
const { test, location } = require('../controllers/locationController');
const router = express.Router();
router.get('/', test);
router.get('/location', location);
module.exports = router;