import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Topbar from './header/Topbar';
import GoogleMapComponent from './map/GoogleMapComponent';
import { MapContext } from './context/MapContext';

const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const authString = btoa(`${username}:${password}`);

const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authString}`
    }
};

const useStyles = makeStyles((theme) => ({
    // topRestaurantText: {
    //     whiteSpace: 'nowrap',
    //     marginRight: '66% !important'
    // },
    // topRestaurantCard: {
    //     marginTop: '40px',
    //     transform: 'translateX(22%)'
    // },
    // restaurantListText: {
    //     whiteSpace: 'nowrap',
    //     marginRight: '76% !important',
    //     marginTop: '40px !important'
    // },
    // restaurantLists: {
    //     marginTop: '40px !important',
    //     padding: theme.spacing(2)
    // },
    // restaurantItem: {
    //     margin: theme.spacing(2)
    // }
}));

function MainPage() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [input, setInput] = useState('');
    const [restaurants, setRestaurants] = useState(null);
    // const [topRestaurant, settopRestaurant] = useState(null);

    const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(false);

    // const [isDataLoading, setIsDataLoading] = useState(false);
    // const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(false);
    // const [isTopRestaurantLoading, setisTopRestaurantLoading] = useState(false);

    const classes = useStyles();

    // Fetch geolocation data
    useEffect(() => {
        fetchGeoData();
    }, [])

    // fetch current geolocation of user data
    const fetchGeoData = async() => {
        await fetch(`${process.env.REACT_APP_API_URL}/geo`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("data loaded");
                    setCurrentLocation(result.location);
                },
                (error) => {
                    console.log("Not loaded");
                }
        )
    }  
    
    // Fetch restaurants list
    const fetchRestaurantsByName = async() => {
        await fetch(`${process.env.REACT_APP_API_URL}/restaurants/search/${input}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("restaurants by location name loaded");
                    setRestaurants(result);
                    setIsRestaurantsLoading(true);
                    console.log(restaurants);
                },
                (error) => {
                    console.log("Not loaded");
                }
            )
    }    

    // useEffect(() => {
    //     const fetch = async() => {
    //         if (isRestaurantsLoading && !isTopRestaurantLoading) {
    //             await fetchTopRestaurant();
    //         }
    //     };
    //     fetch();
    // }, [isRestaurantsLoading]);

    const locationNameOnChangeHandler = (event) => {
        console.log('locationNameOnChangeHandler:: ' + event.target.value);
        setInput(event.target.value);
    }

    const locationNameOnClickHandler = async() => {
        console.log('locationNameOnClickHandler:: ' + input);
        await fetchRestaurantsByName();
    }

    // const myLocationOnClickHandler = async() => {
    //     setisTopRestaurantLoading(false);
    //     settopRestaurant(null);
    //     setIsRestaurantsLoading(false);
    //     setRestaurants(null);
    //     await fetchRestaurants();
    // }


    // // Fetch restaurants list
    // const fetchRestaurantsByName = async() => {
    //     if(!isRestaurantsLoading) {
    //         await fetch(`${process.env.REACT_APP_API_URL}/restaurants/search/${input}`, requestOptions)
    //             .then(res => res.json())
    //             .then(
    //                 (result) => {
    //                     console.log("restaurants by location name loaded");
    //                     setRestaurants(result);
    //                     setIsRestaurantsLoading(true);
    //                 },
    //                 (error) => {
    //                     console.log("Not loaded");
    //                 }
    //             )
    //     }
    // }

    // // Fetch restaurants list
    // const fetchRestaurants = async() => {
    //     if(!isRestaurantsLoading) {
    //         await fetch(`${process.env.REACT_APP_API_URL}/restaurants/lat/${geoData.lat}/long/${geoData.lng}`, requestOptions)
    //             .then(res => res.json())
    //             .then(
    //                 (result) => {
    //                     console.log("restaurants by geo idata loaded");
    //                     setRestaurants(result);
    //                     setIsRestaurantsLoading(true);
                        
    //                 },
    //                 (error) => {
    //                     console.log("Not loaded");
    //                 }
    //             )
    //     }
    // }

    // // Fetch top restaurant
    // const fetchTopRestaurant = async() => {
    //     if(restaurants == null) {
    //         return;
    //     }
    //     if(!isTopRestaurantLoading && isRestaurantsLoading) {
    //         await fetch(`${process.env.REACT_APP_API_URL}/restaurant/top/${restaurants.topId}`, requestOptions)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 console.log("top restaurant loaded");
    //                 settopRestaurant(result);
    //                 setisTopRestaurantLoading(true);
    //             },
    //             (error) => {
    //                 console.log("Not loaded");
    //             }
    //         )
    //     }
    // }

    // if (!geoData) {
    //     return <div>Loading...</div>;
    // }
      
    return (
        <div>
            <Topbar />
            <div>
                {currentLocation &&
                <MapContext.Provider value={{input, locationNameOnChangeHandler, locationNameOnClickHandler}}>
                    <GoogleMapComponent
                        location={currentLocation}
                        locationNameOnChangeHandler={locationNameOnChangeHandler}
                        locationNameOnClickHandler={locationNameOnClickHandler}
                        input={input}
                    />
                </MapContext.Provider>
                }   
            </div>



            {/* {geoData &&
                <GoogleMapComponent location={geoData} topRestaurant={topRestaurant} isTopRestaurantLoading={isTopRestaurantLoading} />
            }             */}
            {/* <Search
                input={input}
                locationNameOnChangeHandler={locationNameOnChangeHandler}
                locationNameOnClickHandler={locationNameOnClickHandler}
                myLocationOnClickHandler={myLocationOnClickHandler}
            />

            {geoData &&
                <GoogleMapComponent location={geoData} topRestaurant={topRestaurant} isTopRestaurantLoading={isTopRestaurantLoading} />
            }

            <Typography className={classes.topRestaurantText} variant="h5">
                Here is a top rated restaurant in your location!
            </Typography>            
            {topRestaurant &&
                <div className={classes.topRestaurantCard}>
                    <RestaurantCard restaurant={topRestaurant} />
                </div>
            }

            <Typography className={classes.restaurantListText} variant="h5">
                Here are other recommendations
            </Typography>            
            {restaurants !== null ? 
                <Grid className={classes.restaurantLists} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 9 }}>
                    {restaurants.results.map((restaurant, index) => (
                        <Grid className={classes.restaurantItem} item xs={2} sm={4} md={4} key={index}>
                            <RestaurantCard restaurant={restaurant} />
                        </Grid>
                    ))}
                </Grid>                    
                : null
            } */}
        </div>
    );
}

export default MainPage;
