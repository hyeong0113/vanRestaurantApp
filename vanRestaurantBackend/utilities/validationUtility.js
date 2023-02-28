const locationValidator = require('../validators/locationValidator');
const { restaurantsWithLocation } = require('../controllers/locationController');

const locationValidation = (req, res) => {
    const {lat, long} = req.params;
    const { error } = locationValidator.getRestaurants.validate(
        {
            lat, long
        }
    )
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    restaurantsWithLocation(req, res);
}

module.exports = {
    locationValidation
}
