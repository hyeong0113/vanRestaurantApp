import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import RestaurantCard from './RestaurantCard';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const username = 'juneKwak';
const password = 'qwe123';

const authString = btoa(`${username}:${password}`);

const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authString}`
    }
};

const useStyles = makeStyles((theme) => ({
    mainPage: {
        marginTop: '3%',
        marginLeft: '200px'
    },
    topRestaurantText: {
        whiteSpace: 'nowrap',
        marginRight: '66% !important'
    },
    topRestaurantCard: {
        marginTop: '40px',
        transform: 'translateX(22%)'
    },
    restaurantListText: {
        whiteSpace: 'nowrap',
        marginRight: '76% !important',
        marginTop: '40px !important'
    },
    restaurantLists: {
        marginTop: '40px !important',
        padding: theme.spacing(2)
    },
    restaurantItem: {
        margin: theme.spacing(2)
    }
}));

function MainPage() {
    const [geoData, setGeoData] = useState(null);
    const [input, setInput] = useState('');
    const [restaurants, setRestaurants] = useState(null);
    const [topRestaurant, settopRestaurant] = useState(null);

    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(false);
    const [isTopRestaurantLoading, setisTopRestaurantLoading] = useState(false);

    const classes = useStyles();

    // Fetch geolocation data
    useEffect(() => {
        const fetchGeoData = async() => {
            if(!isDataLoading) {
                await fetch(`http://127.0.0.1:8080/geo`, requestOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log("data loaded");
                            setGeoData(result.location);
                            setIsDataLoading(true);
                        },
                        (error) => {
                            console.log("Not loaded");
                        }
                    )
            }
        }
        fetchGeoData();
    }, [])

    useEffect(() => {
        const fetch = async() => {
            if (isRestaurantsLoading && !isTopRestaurantLoading) {
                await fetchTopRestaurant();
            }
        };
        fetch();
    }, [isRestaurantsLoading]);

    const locationNameOnChangeHandler = (event) => {
        setInput(event.target.value);
    }

    const locationNameOnClickHandler = async() => {
        setisTopRestaurantLoading(false);
        settopRestaurant(null);
        setIsRestaurantsLoading(false);
        setRestaurants(null);
        await fetchRestaurantsByName();
    }

    const myLocationOnClickHandler = async() => {
        setisTopRestaurantLoading(false);
        settopRestaurant(null);
        setIsRestaurantsLoading(false);
        setRestaurants(null);
        await fetchRestaurants();
    }

    // Fetch restaurants list
    const fetchRestaurantsByName = async() => {
        if(!isRestaurantsLoading) {
            await fetch(`http://127.0.0.1:8080/restaurants/input/${input}`, requestOptions)
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
    }

    // Fetch restaurants list
    const fetchRestaurants = async() => {
        if(!isRestaurantsLoading) {
            await fetch(`http://127.0.0.1:8080/restaurants/lat/${geoData.lat}/long/${geoData.lng}`, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("restaurants by geo idata loaded");
                        setRestaurants(result);
                        setIsRestaurantsLoading(true);
                        
                    },
                    (error) => {
                        console.log("Not loaded");
                    }
                )
        }
    }

    // Fetch top restaurant
    const fetchTopRestaurant = async() => {
        if(restaurants == null) {
            return;
        }
        if(!isTopRestaurantLoading && isRestaurantsLoading) {
            await fetch(`http://127.0.0.1:8080/restaurant/top/${restaurants.topId}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("top restaurant loaded");
                    settopRestaurant(result);
                    setisTopRestaurantLoading(true);
                },
                (error) => {
                    console.log("Not loaded");
                }
            )
        }
    }

    if (!geoData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.mainPage}>
            {geoData.lat}, {geoData.lng}
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={input} onChange={locationNameOnChangeHandler} />
            <Button variant="contained" onClick={locationNameOnClickHandler}>Contained</Button>
            <Button variant="contained" onClick={myLocationOnClickHandler}>My location</Button>
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
            }
        </div>
    );
}

export default MainPage;