import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

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
        top: theme.spacing(81),
        height: '690px !important',
    },
    box: {
        display: "flex",
        overflowX: "scroll",
        paddingLeft: theme.spacing(5),
        // position: 'relative',
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
        paddingTop: '1%',
        paddingBottom: '3%'
    },
    downButton: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        backgroundColor: '#FFFFFF !important',
        border: '3px solid rgba(103, 69, 18, 0.5) !important',
        position: 'absolute',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    icon: {
        color: 'rgba(103, 69, 18, 0.89)'
    }
}));

function MainPage() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [restaurants, setRestaurants] = useState(null);
    const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
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
    const fetchRestaurantsByName = async(input) => {
        setIsDataLoading(true);
        await fetch(`${process.env.REACT_APP_API_URL}/restaurants/search/${input}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("restaurants by location name loaded");
                    setRestaurants(result);
                    setCurrentLocation(result[0].location);
                    setIsRestaurantsLoading(true);
                },
                (error) => {
                    console.log("Not loaded");
                }
            )
        setIsDataLoading(false);
    }    

    return (
        <div className={classes.main}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isDataLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Topbar />
            <div>
                {currentLocation &&
                    <MapContext.Provider
                        value={{fetchRestaurantsByName}}
                    >
                        <GoogleMapComponent
                            location={currentLocation}
                            fetchRestaurantsByName={fetchRestaurantsByName}
                        />
                    </MapContext.Provider>}   
            </div>

            {isRestaurantsLoading &&
                <Container className={classes.container} maxWidth={false}>
                    <IconButton className={classes.downButton}>
                        <ExpandMoreIcon className={classes.icon} fontSize='large' />
                    </IconButton>    
                    <Box className={classes.box}>                    
                        {restaurants.map((restaurant, index) => (
                            <Box className={classes.innerBox} key={index}>
                                <MainRestaurantCard restaurant={restaurant} index={index} />
                            </Box>
                        ))}
                    </Box>
                </Container>
            }
        </div>
    );
}

export default MainPage;
