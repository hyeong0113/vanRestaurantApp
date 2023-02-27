const Restaurant = require("../models/restaurantResponse");

async function checkObjectExistsById(id) {
    try {
        const result = await Restaurant.findOne({ id: id }).catch((error) => {
            console.error(error);
        });   
         
        return result;
      } catch (error) {
        console.error(error);
    }
}

async function saveObjectToDB(data) {
    checkObjectExistsById(data.id)
        .then((result) => {
            if (result) {
                console.log('Object exists');
            } else {
                data.save().catch((err) => console.log(err));
            }
        })
        .catch((err) => {
            console.error(err);
        });
        return data.id;
}

// use place_id

module.exports = {
    checkObjectExistsById,
    saveObjectToDB
};