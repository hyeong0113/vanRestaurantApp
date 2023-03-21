import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Topbar from './header/Topbar';
import GoogleMapComponent from './map/GoogleMapComponent';
import { MapContext } from './context/MapContext';
import MainRestaurantCard from './card/MainRestaurantCard';

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
    main: {
        display: "flex",
        flexDirection: "column"
    },
    container: {
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '10px 10px 0px 0px',
        width: "100%",
        position: "absolute",
        top: theme.spacing(76)
    },
    box: {
        display: "flex",
        overflowX: "scroll",
        padding: theme.spacing(3),
        "&::-webkit-scrollbar": {
            width: "100px",
        },
        "&::-webkit-scrollbar-track": {
            background: "rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            width: "100px",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#EFC677",
            borderRadius: "10px",
        }        
      },
    innerBox: {
        width: 400,
        height: 570,
        marginRight: theme.spacing(21),
        paddingTop: '3%',
        paddingBottom: '3%'
    }
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
        setInput(event.target.value);
    }

    const locationNameOnClickHandler = async() => {
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
        <div className={classes.main}>
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
                    </MapContext.Provider>}   
            </div>

            {isRestaurantsLoading &&
                // <Grid className={classes.container} container spacing={0} wrap="nowrap">
                //     <div style={{ overflowX: 'auto' }}>
                //         {restaurants.map((restaurant, index) => (
                //             <Grid item key={index}>
                //                 <Paper style={{ width: 400, height: 570 }}>
                //                     <MainRestaurantCard restaurant={restaurant} index={index} />
                //                 </Paper>
                //             </Grid>
                //         ))}
                //     </div>

                // </Grid>
                <Container className={classes.container} maxWidth={false}>
                    {/* <Typography variant="h6" gutterBottom>
                        Cards Container
                    </Typography> */}
                    <Box className={classes.box}>
                        {restaurants.map((restaurant, index) => (
                            <Box className={classes.innerBox}>
                                <MainRestaurantCard restaurant={restaurant} index={index} />
                            </Box>
                        ))}
                    </Box>
                </Container>
                
                }



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
