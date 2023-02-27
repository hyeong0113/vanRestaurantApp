var express = require('express');
const { geoLocation, restaurantsWithLocation, getTopRestaurant } = require('../controllers/locationController');
const locationValidator = require('../validators/locationValidator');
const router = express.Router();

router.get('/geo', geoLocation);

router.get('/restaurants/lat/:lat/long/:long', (req, res) => {
    const {lat, long} = req.params;
    const { error } = locationValidator.getRestaurants.validate(
        {
            lat, long
        }
    )
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    else {
        restaurantsWithLocation(req, res);
    }
});

router.get('/restaurant/top/:id', getTopRestaurant);

module.exports = router;