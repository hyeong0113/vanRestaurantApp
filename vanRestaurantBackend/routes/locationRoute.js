var express = require('express');
const { geoLocation, getTopRestaurant } = require('../controllers/locationController');
const { locationValidation } = require('../utilities/validationUtility');
const router = express.Router();

router.get('/geo', geoLocation);
router.get('/restaurants/lat/:lat/long/:long', async(req, res) => {
    locationValidation(req, res)
});
router.get('/restaurant/top/:id', getTopRestaurant);
module.exports = router;