import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grow from '@mui/material/Grow';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

import Topbar from './header/Topbar';
import GoogleMapComponent from './map/GoogleMapComponent';
import { MapContext } from './context/MapContext';
import MainRestaurantCard from './card/MainRestaurantCard';
import MediumRestaurantCard from './card/MediumRestaurantCard';

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
        height: '690px !important',
        top: theme.spacing(81),
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '10px 10px 0px 0px',
        width: "100%",
        position: "absolute",
        transition: 'all 0.5s ease',
        overflowX: "scroll",
        overflowY: 'hidden !important',
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
        },
        "&::-webkit-scrollbar-horizontal": {
            position: 'absolute !important',
        }
    },
    containerMedium: {
        height: '400px !important',
        top: theme.spacing(117.2),        
    },    
    containerShrink: {
        height: '80px !important',
        top: theme.spacing(157),
    },
    box: {
        display: "flex",
        height: '650px !important',
        paddingLeft: theme.spacing(5),
    },
    boxMedium: {
        height: '360px !important',
        // top: 0,
        // right: 0,
        // marginRight: '30px'
    },
    boxShrink: {
        height: 0,
        // TODO: Decrease height of box slowly
        // transition: 'all 0.5s ease-out',
    },
    cardBox: {
        width: 400,
        height: 570,
        marginRight: theme.spacing(21),
        paddingTop: '1%',
        paddingBottom: '3%',
    },
    cardBoxMedium: {
        width: 400,
        height: 290,
    },    
    mediumButton: {
        position: 'absolute !important',
        top: 0,
        right: 0,
        marginRight: '30px !important'
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
    },
    iconShrink: {
        transform: 'rotate(180deg)'
    },
}));

function MainPage() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [restaurants, setRestaurants] = useState(null);
    const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const [isShrink, setIsShrink] = useState(false);
    const [isMedium, setIsMedium] = useState(false);

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
                    setIsShrink(false);
                },
                (error) => {
                    console.log("Not loaded");
                }
            )
        setIsDataLoading(false);
    }    

    const handleDownButtonClick = () => {
        setIsShrink(!isShrink);
        setIsMedium(false);
    }

    const handleMediumButtonClick = () => {
        setIsMedium(!isMedium);
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
                <Container className={`${classes.container} ${isMedium ? classes.containerMedium : ''}`} maxWidth={false}>
                    <IconButton className={classes.downButton} onClick={handleDownButtonClick}>
                        <ExpandMoreIcon className={`${classes.icon} ${isShrink ? classes.iconShrink : ''}`} fontSize='large' />
                    </IconButton>
                    <IconButton className={classes.mediumButton} onClick={handleMediumButtonClick}>
                        <CloseFullscreenIcon />
                    </IconButton>
                    <Box className={`${classes.box} ${isMedium ? classes.boxMedium : ''}`}>                    
                        {restaurants.map((restaurant, index) => (
                            <Grow
                                key={index}
                                in={!isShrink}
                                style={{ transformOrigin: '0 0 0' }}
                                timeout={500*index}
                            >
                                <Box className={`${classes.cardBox} ${isMedium ? classes.cardBoxMedium : ''}`} key={index}>
                                    <MediumRestaurantCard restaurant={restaurant} index={index} />
                                </Box> 
                            </Grow>
                        ))}                    
                    </Box>
                </Container>
            }
        </div>
    );
}

export default MainPage;

// {restaurants.map((restaurant, index) => (
//     <Grow
//         key={index}
//         in={!isShrink}
//         style={{ transformOrigin: '0 0 0' }}
//         timeout={500*index}
//     >
//         <Box className={classes.cardBox} key={index}>
//             <MainRestaurantCard restaurant={restaurant} index={index} />
//         </Box>
// ))}


/*
                <Container className={`${classes.container} ${isShrink ? classes.containerShrink : ''}`} maxWidth={false}>
                    <IconButton className={classes.downButton} onClick={handleDownButtonClick}>
                        <ExpandMoreIcon className={`${classes.icon} ${isShrink ? classes.iconShrink : ''}`} fontSize='large' />
                    </IconButton>
                    <IconButton className={classes.mediumButton}>
                        <CloseFullscreenIcon />
                    </IconButton>
                    <Box className={`${classes.box} ${isShrink ? classes.boxShrink : ''}`}>                    
                        {restaurants.map((restaurant, index) => (
                            <Grow
                                key={index}
                                in={!isShrink}
                                style={{ transformOrigin: '0 0 0' }}
                                timeout={500*index}
                            >
                                <Box className={classes.cardBox} key={index}>
                                    <MainRestaurantCard restaurant={restaurant} index={index} />
                                </Box>
                             
                            </Grow>
                        ))}
                    </Box>
                </Container>
 */