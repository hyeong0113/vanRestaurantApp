class CreateTopRestaurantDto {
    constructor(restaurant, open_now, photo) {
        this.placeId = restaurant.place_id;
        this.name = restaurant.name;
        this.address = null;
        this.businessStatus = restaurant.business_status;
        this.location = restaurant.geometry.location;
        this.openNow = open_now;
        this.photo = photo;
        this.rating = restaurant.rating;
        this.isTop = false;
        this.isFavorite = false;
        this.url = null;
    }
  }
  
  module.exports = CreateTopRestaurantDto;