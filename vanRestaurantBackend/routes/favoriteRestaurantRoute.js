var express = require('express');
const { getFavoriteRestaurantsByUserId,
        createFavoriteRestaurant,
        deleteFavoriteRestaurantByPlaceId,
        deleteAllFavoriteRestaurants } = require('../controllers/favoriteRestaurantController');
const router = express.Router();

router.get('/favoriterestaurant/all', getFavoriteRestaurantsByUserId);
router.post('/favoriterestaurant/create', createFavoriteRestaurant);
router.delete('/favoriterestaurant/delete', deleteFavoriteRestaurantByPlaceId);
router.delete('/favoriterestaurant/delete/all', deleteAllFavoriteRestaurants);

module.exports = router;