const axios = require('axios');
require('dotenv').config()

const getPhotoByReference = async (reference) => {
    const photo = await axios.get('https://maps.googleapis.com/maps/api/place/photo',
    {
        responseType: 'arraybuffer',
        params:
        {
            photo_reference: reference,
            maxwidth: 400,
            key: process.env.API_KEY
        }
    })
    // res.set('Content-Type', photo.headers['content-type']);
    return (Buffer.from(photo.data).toString('base64'));
}

module.exports = {
    getPhotoByReference
    
}