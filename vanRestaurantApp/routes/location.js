var express = require('express');
const { test, geoLocation, location } = require('../controllers/locationController');
const router = express.Router();

router.get('/location', location);
router.get('/geo', geoLocation);

module.exports = router;