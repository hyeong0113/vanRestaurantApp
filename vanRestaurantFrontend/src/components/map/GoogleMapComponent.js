import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { makeStyles } from '@mui/styles';
import MapIconButton from '../button/MapIconButton';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Search from '../search/Search';

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
    search: {
        position: "absolute",
        top: theme.spacing(55),
        left: theme.spacing(130)
    },
}));
const GoogleMapComponent = (props) => {
    const mapRef = useRef();
    const [center, setCenter] = useState({ lat: props.location.lat, lng: props.location.lng });
    const [zoom, setZoom] = useState(14);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })

    const classes = useStyles();

    useEffect(() => {
        if(props.isTopRestaurantLoading) {
            setCenter(props.topRestaurant.location);
        }
        else {
            setCenter(props.location);
        }
    })

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

    const onClick = () => {
        console.log('test');
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
                    {/* <Marker
                        lat={11.0168}
                        lng={76.9558}
                        name="My Marker"
                    /> */}
                <Marker
                    position={center}
                />
            </GoogleMap>

            }
            <div className={classes.buttonContainer}>
                <MapIconButton index={0} icon={<HomeIcon className={classes.icon} />} />
                <MapIconButton index={1} icon={<LocationOnIcon className={classes.icon} />} />
                <MapIconButton index={2} icon={<FavoriteIcon className={classes.icon} />} />
            </div>    
            <div className={classes.search}>
                <Search />
            </div>
        </Box>
    );
}

export default GoogleMapComponent;