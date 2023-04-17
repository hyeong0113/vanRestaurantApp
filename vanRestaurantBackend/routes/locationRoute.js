var express = require('express');
const { getGeoLocation, getRestaurantsWithLocationName } = require('../controllers/locationController');
const { locationValidation } = require('../utilities/validationUtility');
const { tokenValidatorForLocation } = require('../validators/locationValidator');
const router = express.Router();

router.get('/location/geo', getGeoLocation);
router.post('/location/search', tokenValidatorForLocation, getRestaurantsWithLocationName);

module.exports = router;