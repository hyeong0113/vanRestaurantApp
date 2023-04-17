var express = require('express');
const { getTopRestaurantsByUser, deleteTopRestaurantByPlaceId, deleteAllTopRestaurants } = require('../controllers/topRestaurantController');
const { tokenValidator } = require('../validators/authValidator');
const router = express.Router();


router.get('/toprestaurant/all', tokenValidator, getTopRestaurantsByUser);
router.delete('/toprestaurant/delete', tokenValidator, deleteTopRestaurantByPlaceId);
router.delete('/toprestaurant/delete/all', tokenValidator, deleteAllTopRestaurants);

module.exports = router;