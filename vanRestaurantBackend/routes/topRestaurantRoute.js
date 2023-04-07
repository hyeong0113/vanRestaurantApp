var express = require('express');
const { getTopRestaurantsByUserId, deleteTopRestaurantByPlaceId, deleteAllTopRestaurants } = require('../controllers/topRestaurantController');
const router = express.Router();


router.get('/toprestaurant/all', getTopRestaurantsByUserId);
router.delete('/toprestaurant/delete', deleteTopRestaurantByPlaceId);
router.delete('/toprestaurant/delete/all', deleteAllTopRestaurants);

module.exports = router;