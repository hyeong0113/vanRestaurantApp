var express = require('express');
const { test, geoLocation, restaurantsWithLocation } = require('../controllers/locationController');
const router = express.Router();

router.get('/restaurants/lat/:lat/long/:long', restaurantsWithLocation);
router.get('/geo', geoLocation);

module.exports = router;