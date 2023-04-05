var express = require('express');
const { getTopRestaurantsByUserId } = require('../controllers/topRestaurantController');
const router = express.Router();


router.get('/toprestaurant/all', getTopRestaurantsByUserId);
// router.get('/restaurants/lat/:lat/long/:long', async(req, res) => {
//     locationValidation(req, res)
// });
// router.get('/restaurant/top/:id', getTopRestaurant);

module.exports = router;