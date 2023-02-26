var express = require('express');
const { geoLocation, restaurantsWithLocation } = require('../controllers/locationController');
const locationValidator = require('../validators/locationValidator');
const router = express.Router();

router.get('/restaurants/lat/:lat/long/:long', (req, res) => {
    const {lat, long} = req.params;
    const { error, value } = locationValidator.getRestaurants.validate(
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

router.get('/geo', geoLocation);

module.exports = router;