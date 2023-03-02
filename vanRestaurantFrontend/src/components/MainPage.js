import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import RestaurantCard from './RestaurantCard';

import '../styles/mainPage.css';

const username = 'juneKwak';
const password = 'qwe123';

const authString = btoa(`${username}:${password}`);

const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authString}`
    }
};

function MainPage() {
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
        <div className="main-page">
            {restaurants !== null ? 
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 9 }} justify="center">
                    {restaurants.results.map((restaurant, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <RestaurantCard restaurant={restaurant} />
                        </Grid>
                    ))}
                </Grid>                    
                : null
            }
            {topRestaurant !== null ?

                console.log(topRestaurant) : null
            }
        
        </div>
    );
}

export default MainPage;
