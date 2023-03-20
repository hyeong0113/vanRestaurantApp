const locationValidator = require('../validators/locationValidator');
const { getRestaurantsWithGeo } = require('../controllers/locationController');

const locationValidation = async(req, res) => {
    // const {lat, long} = req.params;
    // const { error } = locationValidator.getRestaurants.validate(
    //     {
    //         lat, long
    //     }
    // )
    // if(error) {
    //     return res.status(400).send(error.details[0].message);
    // }
    // await getRestaurantsWithGeo(req, res);
}

module.exports = {
    locationValidation
}
