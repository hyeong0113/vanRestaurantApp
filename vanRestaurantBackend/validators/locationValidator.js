const joi = require('joi');

const locationValidator = {
    getRestaurants : joi.object({
        lat: joi.string().pattern(/[+-]?([0-9]*[.])?[0-9]+$/).required().error(() => new Error('latitude should be number', 'lat')),
        long: joi.string().pattern(/[+-]?([0-9]*[.])?[0-9]+$/).required().error(() => new Error('longitude should be number', 'long'))
    })
};

module.exports = locationValidator;