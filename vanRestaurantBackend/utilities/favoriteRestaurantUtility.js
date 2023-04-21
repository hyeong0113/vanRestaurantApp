const { convertToFavoriteRestaurant } = require('./schemaUtility');

require('dotenv').config();


const saveFavoriteRestaurant = async (favoriteRestaurant, user) => {
    let found = await user.favoriteRestaurants.find(r => r.placeId === favoriteRestaurant.placeId);
    if(!found) {
        const convertedFavoriteRestaurant = convertToFavoriteRestaurant(favoriteRestaurant);
        convertedFavoriteRestaurant.userId = user._id;
        await convertedFavoriteRestaurant.save(function(err) {
            if(err) {
                return { message: err, success: false }
            }
            console.log('Favorite restaurant saved!');
        });

        user.favoriteRestaurants.push(convertedFavoriteRestaurant);
        await user.save(function(err) {
            if(err) {
                return { message: err, success: false }
            }
            console.log('Favorite restaurant save to user!');
        });
        return { message: "Favorite restaurant saved!", success: true }
    }
    console.log('Favorite restaurant exist!');
    return { message: "Favorite restaurant exist!", success: true }
}

const populateFavoriteRestaurants = async(user, res) => {
    try {
        var populatedUser = await user.populate('favoriteRestaurants');
    }
    catch(err) {
        throw res.status(500).json(error);
    }
    return populatedUser;
}

module.exports = {
    saveFavoriteRestaurant,
    populateFavoriteRestaurants
}