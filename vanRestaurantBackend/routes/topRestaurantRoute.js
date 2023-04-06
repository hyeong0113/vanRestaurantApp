var express = require('express');
const { getTopRestaurantsByUserId, deleteTopRestaurantByPlaceId } = require('../controllers/topRestaurantController');
const router = express.Router();


router.get('/toprestaurant/all', getTopRestaurantsByUserId);
router.delete('/toprestaurant/delete', deleteTopRestaurantByPlaceId);
// router.get('/restaurants/lat/:lat/long/:long', async(req, res) => {
//     locationValidation(req, res)
// });
// router.get('/restaurant/top/:id', getTopRestaurant);

module.exports = router;