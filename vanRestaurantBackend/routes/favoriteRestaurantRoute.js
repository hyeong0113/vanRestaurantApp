var express = require('express');
const { getFavoriteRestaurantsByUserId,
        createFavoriteRestaurant,
        deleteFavoriteRestaurantByPlaceId,
        deleteAllFavoriteRestaurants } = require('../controllers/favoriteRestaurantController');
const { tokenValidator } = require('../validators/authValidator');
const router = express.Router();

router.get('/favoriterestaurant/all', tokenValidator, getFavoriteRestaurantsByUserId);
router.post('/favoriterestaurant/create', tokenValidator, createFavoriteRestaurant);
router.delete('/favoriterestaurant/delete', tokenValidator, deleteFavoriteRestaurantByPlaceId);
router.delete('/favoriterestaurant/delete/all', tokenValidator, deleteAllFavoriteRestaurants);

module.exports = router;