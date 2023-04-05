var express = require('express');
const { getGeoLocation, checkDbTest, getRestaurantsWithLocationName } = require('../controllers/locationController');
const { locationValidation } = require('../utilities/validationUtility');
const router = express.Router();

router.get('/geo', getGeoLocation);
router.get('/restaurants/search/:input', getRestaurantsWithLocationName);
router.get('/test', checkDbTest);
// router.get('/restaurants/lat/:lat/long/:long', async(req, res) => {
//     locationValidation(req, res)
// });
// router.get('/restaurant/top/:id', getTopRestaurant);

module.exports = router;