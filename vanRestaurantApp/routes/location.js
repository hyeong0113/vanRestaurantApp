var express = require('express');
const { test, geoLocation, restaurants } = require('../controllers/locationController');
const router = express.Router();

router.get('/restaurants/:location', restaurants);
router.get('/geo', geoLocation);

module.exports = router;