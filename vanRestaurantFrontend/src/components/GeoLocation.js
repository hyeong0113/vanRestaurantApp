import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

const username = 'juneKwak';
const password = 'qwe123';

const authString = btoa(`${username}:${password}`);

const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authString}`
    }
};

function GeoLocation() {
    const [geoData, setGeoData] = useState(null);
    const [restaurants, setRestaurants] = useState(null);
    const [topRestaurant, settopRestaurant] = useState(null);

    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(true);
    const [isTopRestaurantLoading, setisTopRestaurantLoading] = useState(true);

    // Fetch geolocation data
    useEffect(() => {
        const fetchGeoData = async() => {
            if(isDataLoading) {
                await fetch(`http://127.0.0.1:8080/geo`, requestOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log("data loaded");
                            setGeoData(result);
                            setIsDataLoading(false);
                        },
                        (error) => {
                            console.log("Not loaded");
                        }
                    )
            }
        }
        fetchGeoData();
    }, [])

    // Fetch restaurants list
    useEffect(() => {
        const fetchRestaurants = async() => {
            if(geoData == null) {
                return;
            }
            if(isRestaurantsLoading) {
                await fetch(`http://127.0.0.1:8080/restaurants/lat/${geoData.location.lat}/long/${geoData.location.lng}`, requestOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log("restaurants loaded");
                            setRestaurants(result);
                            setIsRestaurantsLoading(false);
                        },
                        (error) => {
                            console.log("Not loaded");
                        }
                    )
            }
        }
        fetchRestaurants();
    }, [geoData])

    // Fetch top restaurant
    useEffect(() => {
        const fetchTopRestaurant = async() => {
            if(restaurants == null) {
                return;
            }
            if(isTopRestaurantLoading) {
                console.log("isTopRestaurantLoading: " + isTopRestaurantLoading);

                await fetch(`http://127.0.0.1:8080/restaurant/top/${restaurants.topId}`, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("top restaurant loaded");
                        settopRestaurant(result);
                        setisTopRestaurantLoading(false);
                    },
                    (error) => {
                        console.log("Not loaded");
                    }
                )
            }
        }
        fetchTopRestaurant();
    }, [restaurants])    

    if (!geoData || !restaurants || !topRestaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* {restaurants.results !== undefined && restaurants.results !== null ? 
                <RestaurantCard restaurant={restaurants.results[0]} />
                : null
            } */}
            {restaurants !== null ? 
                <RestaurantCard restaurant={restaurants.results[0]} />
                : null
            }
            {topRestaurant !== null ?

                console.log(topRestaurant) : null
            }
        </div>
    );
}

export default GeoLocation;
