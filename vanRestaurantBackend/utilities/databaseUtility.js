const Restaurant = require("../models/restaurantschema");

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
    await checkObjectExistsById(data.id)
        .then(async(result) => {
            if (result) {
                console.log('Object exists');
            } else {
                await data.save().catch((err) => console.log(err));
            }
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
        return data.id;
}

module.exports = {
    checkObjectExistsById,
    saveObjectToDB
};