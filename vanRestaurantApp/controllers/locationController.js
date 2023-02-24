var axios = require('axios');
require('dotenv').config()

const test = (req, res) => {
    res.send('Hello world!');
}
  
const location = async (req, res) => {
    const mapRes = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
    {
        params: 
        {
            input: 'Museum of Contemporary Art Australia',
            inputtype: 'textquery',
            fields: 'formatted_address,name,rating,opening_hours,geometry',
            key: process.env.API_KEY
        }
    });
    console.log(JSON.stringify(mapRes.data));
    res.send(JSON.stringify(mapRes.data));
}

module.exports = {
    test,
    location
}