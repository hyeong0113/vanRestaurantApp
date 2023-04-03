const User = require('../models/userSchema');

async function checkUserExistsByEmail(email) {
    try {
        const result = await User.findOne({ email: email }).catch((error) => {
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
    checkUserExistsByEmail
};