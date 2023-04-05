var express = require('express');
const { getGeoLocation, getRestaurantsWithLocationName } = require('../controllers/locationController');
const { locationValidation } = require('../utilities/validationUtility');
const router = express.Router();

router.get('/geo', getGeoLocation);
router.get('/restaurants/search/:input', getRestaurantsWithLocationName);
// router.get('/restaurants/lat/:lat/long/:long', async(req, res) => {
//     locationValidation(req, res)
// });
// router.get('/restaurant/top/:id', getTopRestaurant);

module.exports = router;