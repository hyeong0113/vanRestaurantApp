var express = require('express');
const { getGeoLocation, getRestaurantsWithLocationName } = require('../controllers/locationController');
const { locationValidation } = require('../utilities/validationUtility');
const router = express.Router();

router.get('/location/geo', getGeoLocation);
router.post('/location/search', getRestaurantsWithLocationName);

module.exports = router;