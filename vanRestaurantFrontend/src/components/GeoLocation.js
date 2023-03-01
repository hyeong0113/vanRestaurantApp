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
    const [data, setData] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(true);

    useEffect(() => {
        if(isDataLoading) {
            fetch(`http://127.0.0.1:8080/geo`, requestOptions)
            .then(res => res.json())
            .then(
            (result) => {
                console.log("data loaded");
                setData(result);
                setIsDataLoading(false);
            },
            (error) => {
                console.log("Not loaded");
            }
            )
        }
    },[])

    useEffect(() => {
        const fetchRestaurants = async() => {
            if(data == null) {
                return;
            }
            if(isRestaurantsLoading) {
                await fetch(`http://127.0.0.1:8080/restaurants/lat/${data.location.lat}/long/${data.location.lng}`, requestOptions)
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
    }, data)

    if (!data || !restaurants) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* {restaurants !== undefined && restaurants !== null ? 
                console.log(restaurants.results)
                : null
            }             */}
            {restaurants.results !== undefined && restaurants.results !== null ? 
                <RestaurantCard restaurant={restaurants.results[0]} />
                : null
            }
        </div>
    );
    }

export default GeoLocation;
