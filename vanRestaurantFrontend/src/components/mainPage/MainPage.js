import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

import Topbar from '../header/Topbar';
import GoogleMapComponent from '../map/GoogleMapComponent';
import { MapContext } from '../context/MapContext';
import MainRestaurantCard from '../card/MainRestaurantCard';
import MediumRestaurantCard from '../card/MediumRestaurantCard'
import { logoutHandler } from '../../utilities/LogOut';
import AlertTimeout from '../alert/AlertTimeout';

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
    },
    box: {
        display: "flex",
        paddingLeft: theme.spacing(5),
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
    shrinkedCard: {
        height: 25
    },
    cardBox: {
        width: 400,
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
    const [resultRestaurants, setResultRestaurants] = useState(null);
    const [favoriteList, setFavoriteList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const [isRestaurantsFetched, setIsRestaurantsFetched] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isShrink, setIsShrink] = useState(false);
    const [isMedium, setIsMedium] = useState(false);
    const [isGeoDataFetched, setIsGeoDataFetched] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [isError, setIsError] = useState(false);

    const classes = useStyles();

    // Fetch geolocation data
    useEffect(() => {
        validateToken();
        fetchGeoData();
        setIsGeoDataFetched(true);
        fetchFavoriteRestaurant();
    }, [isGeoDataFetched, isRestaurantsFetched])

    const validateToken = async() => {
        let token = localStorage.getItem("authenticated");
        if(token && token.length > 0) {
            let tokenValue = token;
            const decodedJwt = parseJwt(tokenValue);
            if (decodedJwt.exp * 1000 < Date.now()) {
                let token = null;
                if(token.length > 0) {
                    token = 'Bearer ' + tokenValue;
                }
                const result = await logoutHandler(token);
                if(!result) {
                    localStorage.setItem("authenticated", "");
                    window.location.reload(false);
                }
                else {
                    console.log("Unavailable to logout");
                }
            }
            setIsAuthenticated(true);
        }
    }

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
    };

    // fetch current geolocation of user data
    const fetchGeoData = async() => {
        setIsDataLoading(true);
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        setIsDataLoading(false);
    }

    const successCallback = (position) => {
        setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    };
      
    const errorCallback = (error) => {
        console.log(error);
    };
      
    // Fetch restaurants list
    const fetchRestaurantsByName = async(input) => {
        setIsDataLoading(true);
        let tokenValue = null;
        let token = null;
        if(isAuthenticated) {
            tokenValue = localStorage.getItem("authenticated");
            token = 'Bearer ' + tokenValue;
        }
        const restaurantRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                token: tokenValue,
                input: input,
            })
        };
        setIsRestaurantsFetched(false);
        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/location/search`, restaurantRequestOptions);
            let convertedResponse  = await response.json();
            
            if(!convertedResponse.success) {
                throw new Error(convertedResponse.message);
            }

            console.log("restaurants by location name loaded");
            let result = convertedResponse.response;
            setRestaurants(result);
            setResultRestaurants(result);
            const tempSelectedList = [];
            for(let i = 0; i < result.length; i++) {
                tempSelectedList.push(result[i].isFavorite);
            }
            setSelectedList(tempSelectedList);
            setIsRestaurantsFetched(true);
            setIsShrink(false);
            setIsError(false);
        }
        catch(error) {
            setErrorMessage(error.message);
            setIsError(true);
            console.log("Not loaded:: ", error.message);
        }
        setIsDataLoading(false);
    }

    const fetchFavoriteRestaurant = async() => {
        setIsDataLoading(true);
        if(isAuthenticated) {
            let tokenValue = null;
            let token = null;
            tokenValue = localStorage.getItem("authenticated");
            token = 'Bearer ' + tokenValue;
            const requestOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            };
            try {
                let response = await fetch(`${process.env.REACT_APP_API_URL}/favoriterestaurant/all`, requestOptions);
                let convertedResponse  = await response.json();
                if(!convertedResponse.success) {
                    throw new Error(convertedResponse.message);
                }
                console.log("data loaded");
                let result = convertedResponse.response;
                if(result.length > 0) {
                    setFavoriteList(result);
                }
                else {
                    setFavoriteList([]);
                }
            }
            catch(error) {
                console.log("Not loaded:: ", error.message);
            }
        }
        setIsDataLoading(false);
    }

    const handleDownButtonClick = () => {
        setIsShrink(!isShrink);
        setIsMedium(false);
    }

    const handleMediumButtonClick = () => {
        setIsMedium(!isMedium);
        setIsShrink(false);
    }

    const onFavoriteButtonClick = (index) => {
        const newSelected = [...selectedList];
        newSelected[index] = !newSelected[index];
        setSelectedList(newSelected);
    }

    const onBoxClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
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

            <AlertTimeout isError={isError} message={errorMessage} setIsError={setIsError} />
            <div>
                {currentLocation &&
                    <MapContext.Provider
                        value={{fetchRestaurantsByName}}
                    >
                        <GoogleMapComponent
                            location={currentLocation}
                            restaurants={restaurants}
                            isRestaurantsFetched={isRestaurantsFetched}
                            selectedRestaurant={selectedRestaurant}
                            resultRestaurants={resultRestaurants}
                            favoriteList={favoriteList}
                            fetchRestaurantsByName={fetchRestaurantsByName}
                            setRestaurants={setRestaurants}
                            setIsRestaurantsFetched={setIsRestaurantsFetched}
                        />
                    </MapContext.Provider>}   
            </div>
            {isRestaurantsFetched &&
                <Fade
                    in={true}
                    timeout={{enter: 3000, exit: 5000}}
                    easing="ease"
                >            
                    <Container className={classes.container} maxWidth={false}>
                        <IconButton className={classes.downButton} onClick={handleDownButtonClick}>
                            <ExpandMoreIcon className={`${classes.icon} ${isShrink ? classes.iconShrink : ''}`} fontSize='large' />
                        </IconButton>
                        <IconButton className={classes.mediumButton} onClick={handleMediumButtonClick}>
                            <CloseFullscreenIcon />
                        </IconButton>
                        <Box className={classes.box}>                    
                            {restaurants.map((restaurant, index) => {
                                if(isMedium) {
                                    return(
                                        <Fade
                                            key={index}
                                            in={!isShrink}
                                            style={{ transformOrigin: '0 0 0' }}
                                            timeout={500*index}
                                            easing="ease"
                                        >
                                            <Box className={classes.cardBox} key={index} onClick={() => onBoxClick(restaurant)}>
                                                <MediumRestaurantCard restaurant={restaurant} index={index} selected={selectedList[index]} onFavoriteButtonClick={onFavoriteButtonClick} />
                                            </Box>                              
                                        </Fade>
                                    )
                                }
                                else if(isShrink) {
                                    return(
                                        <div key={index} className={classes.shrinkedCard}/>
                                    )
                                }
                                else {
                                    return (
                                        <Fade
                                            key={index}
                                            in={!isShrink}
                                            style={{ transformOrigin: '0 0 0' }}
                                            timeout={500*index}
                                        >
                                            <Box className={classes.cardBox} key={index}>
                                                <MainRestaurantCard restaurant={restaurant} index={index} selected={selectedList[index]} onFavoriteButtonClick={onFavoriteButtonClick} />
                                            </Box>                                
                                        </Fade>
                                    )
                                }
                            })}                    
                        </Box>
                    </Container>
                </Fade>
            }
        </div>
    );
}

export default MainPage;
