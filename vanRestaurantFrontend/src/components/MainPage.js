import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';
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
        flexDirection: "column",
        height: '100%',
        position: 'relative'
    },
    container: {
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '10px 10px 0px 0px',
        width: "100%",
        position: "absolute",
        // transition: 'all 2s ease',
    },
    box: {
        display: "flex",
        paddingLeft: theme.spacing(5),
        overflowX: "scroll",
        overflowY: 'hidden !important',
        // transition: 'all 2s ease',
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
    shrinkedCard: {
        height: 25
    },
    cardBox: {
        width: 400,
        // transition: 'all 2s ease',
        marginRight: theme.spacing(21),
        paddingTop: '1%',
        paddingBottom: '3%',
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
    const [opacity, setOpacity] = useState(1);

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
        await fetch(`${process.env.REACT_APP_API_URL}/restaurants/search/${"9855 Austin Ave, Burnaby, BC V3J 1N4, Canada"}`, requestOptions)
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

    // const Item = ({item}) => {
    //     return <div>{item.name}</div>;
    //   };
    // const renderMainRestaurantCard = ({restaurant, index}) => {
    //     console.log(index);
    //     return(
    //         <Fade
    //             key={index}
    //             in={!isShrink}
    //             style={{ transformOrigin: '0 0 0' }}
    //             timeout={500*index}
    //         >
    //             <Box className={classes.cardBox} key={index}>
    //                 <MainRestaurantCard restaurant={restaurant} index={index} />
    //             </Box>                                
    //         </Fade>
    //     )
    // }

    const handleDownButtonClick = () => {
        // setOpacity(!opacity);
        setIsShrink(!isShrink);
        setIsMedium(false);
    }

    const handleMediumButtonClick = () => {
        // setOpacity(!opacity);
        setIsMedium(!isMedium);
        setIsShrink(false);
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
                <Fade
                    in={true}
                    timeout={3000}
                    easing="ease"
                >            
                    <Container className={classes.container} maxWidth={false}>
                        <IconButton className={classes.downButton} onClick={handleDownButtonClick}>
                            <ExpandMoreIcon className={`${classes.icon} ${isShrink ? classes.iconShrink : ''}`} fontSize='large' />
                        </IconButton>
                        <IconButton className={classes.mediumButton} onClick={handleMediumButtonClick}>
                            <CloseFullscreenIcon />
                        </IconButton>
                        <Fade
                            in={true}
                            // timeout={1000}
                            easing="ease"
                        >
                            <Box className={classes.box}>                    
                                {restaurants.map((restaurant, index) => {
                                    if(isMedium) {
                                        return(
                                            <Fade
                                                key={index}
                                                in={true}
                                                style={{ transformOrigin: '0 0 0' }}
                                                timeout={500*index}
                                                easing="ease"
                                            >
                                                <Box className={classes.cardBox} key={index}>
                                                    <MediumRestaurantCard restaurant={restaurant} index={index} />
                                                </Box>                              
                                            </Fade>
                                        )
                                    }
                                    else if(isShrink) {
                                        return(
                                            <div key={index} className={classes.shrinkedCard}/>
                                        )
                                    }else {
                                        return (
                                            <Fade
                                                key={index}
                                                in={true}
                                                style={{ transformOrigin: '0 0 0' }}
                                                timeout={500*index}
                                            >
                                                <Box className={classes.cardBox} key={index}>
                                                    <MainRestaurantCard restaurant={restaurant} index={index} />
                                                </Box>                                
                                            </Fade>
                                        )
                                    }
                                })}                    
                            </Box>
                        </Fade>
                    </Container>
                </Fade>
            }
        </div>
    );
}

export default MainPage;
