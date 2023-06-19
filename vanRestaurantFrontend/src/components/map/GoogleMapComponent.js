import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { makeStyles } from '@mui/styles';
import MapIconButton from '../button/MapIconButton';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Search from '../search/Search';
import OrangePin from '../../assets/orange-dot.png'

const useStyles = makeStyles((theme) => ({
    mapBox: {
        height: '100vh'
    },
    buttonContainer: {
        transform: 'translateY(-50%)',
        display: 'grid',
        gridRowGap: '5%',
        position: "absolute",
        top: theme.spacing(65),
        left: theme.spacing(2)
    },
    icon: {
        color: 'rgba(103, 69, 18, 0.89)'
    },
    iconSelected: {
        color: '#FFFFFF'
    },
    search: {
        position: "absolute",
        top: theme.spacing(55),
        left: theme.spacing(130)
    },
}));

const libary = ['places']
const GoogleMapComponent = (props) => {
    const mapRef = useRef();
    const [selectedButton, setSelectedButton] = useState(null);
    const [center, setCenter] = useState({ lat: props.location.lat, lng: props.location.lng });
    const [restaurantList, setRestaurantList] = useState([]);

    const [zoom, setZoom] = useState(14);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: libary
    })
    const classes = useStyles();

    const handleButtonClick = async(buttonName) => {
        setSelectedButton(buttonName);
    };

    useEffect(() => {
        switch(selectedButton) {
            case "restaurants":
                props.setRestaurants(props.resultRestaurants);
                convertRestaurantsToLocationList(props.resultRestaurants);                break;
            case "favorite":
                props.setRestaurants(props.favoriteList);
                convertRestaurantsToLocationList(props.favoriteList);
                break;
            default:
                setSelectedButton("myLocation");
                setCenter({ lat: props.location.lat, lng: props.location.lng });
                props.setIsRestaurantsFetched(false);
                break;
        }
    }, [selectedButton, props.isRestaurantsFetched])
    
    const convertRestaurantsToLocationList = (restaurants) => {
        if(restaurants !== undefined && restaurants !== null) {
            const tempRestaurantList = [];
            for(let i = 0; i < restaurants.length; i++) {
                tempRestaurantList.push({ lat: restaurants[i].location.lat, lng: restaurants[i].location.lng })
            }
            setRestaurantList(tempRestaurantList);
            setCenter({ lat: tempRestaurantList[0].lat, lng: tempRestaurantList[0].lng });
            props.setIsRestaurantsFetched(true);
        }

    }

    const onLoad = (map) => {
        mapRef.current = map;
    };

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    const mapContainerStyle = {
        height: "100%",
        width: "100%",
        position: "relative"
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true
    };
    
    const renderMarker = () => {
        if(selectedButton === "myLocation") {
            return <Marker
                        position={center}
                        icon={{
                            url: OrangePin,
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                    />            
        }
        else {
            if(restaurantList.length  > 0) {
                return restaurantList.map((restaurant, index) => {
                    return <Marker
                                key={index}
                                position={restaurant}
                                icon={ index === 0 && {
                                    url: OrangePin,
                                    scaledSize: new window.google.maps.Size(40, 40),
                                }}
                            />
                })
            }
        }
    }

    return (
        <Box className={classes.mapBox}>
            {isLoaded &&
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    onLoad={onLoad}
                    zoom={zoom}
                    options={options}
                >
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: 'primary',
                            '&:hover': {
                                backgroundColor: 'primary',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                    {renderMarker()}
                </GoogleMap>
            }
            
            <div className={classes.buttonContainer}>
                <MapIconButton
                    index={0}
                    selectedButton={selectedButton}
                    icon={<HomeIcon className={`${classes.icon} ${selectedButton === "myLocation" ? classes.iconSelected : ''}`} />}
                    handleButtonClick={handleButtonClick}
                    type="myLocation" />
                <MapIconButton
                    index={1}
                    selectedButton={selectedButton}
                    icon={<LocationOnIcon className={`${classes.icon} ${selectedButton === "restaurants" ? classes.iconSelected : ''}`} />}
                    handleButtonClick={handleButtonClick}
                    type="restaurants" />
                <MapIconButton
                    index={2}
                    selectedButton={selectedButton}
                    icon={<FavoriteIcon className={`${classes.icon} ${selectedButton === "favorite" ? classes.iconSelected : ''}`} />}
                    handleButtonClick={handleButtonClick}
                    type="favorite" />
            </div>    
            <div className={classes.search}>
                {isLoaded && <Search setSelectedButton={setSelectedButton} />}
            </div>
            
        </Box>
    );
}

export default GoogleMapComponent;