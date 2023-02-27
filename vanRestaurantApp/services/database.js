const Restaurant = require("../models/restaurantResponse");

async function checkObjectExists(data) {
    try {
        const result = await Restaurant.findOne({ id: data.id }).catch((error) => {
            console.error(error);
        });   
         
        return result;
      } catch (error) {
        console.error(error);
    }
}

module.exports = { checkObjectExists };