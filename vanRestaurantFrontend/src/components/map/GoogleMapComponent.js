import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    mapBox: {
        height: '100vh'
    }
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
        // borderRadius: "15px"
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true
    };
  
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
        </Box>
    );
}

export default GoogleMapComponent;