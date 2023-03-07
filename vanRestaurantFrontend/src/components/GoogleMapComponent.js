import { useRef, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GoogleMapComponent = (props) => {
    const mapRef = useRef();
    const [center, setCenter] = useState({ lat: props.location.lat, lng: props.location.lng });
    const [zoom, setZoom] = useState(14);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })

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
        height: "60vh",
        width: "900px"
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true
    };
  
    return (
        <div>
            {isLoaded &&
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    onLoad={onLoad}
                    zoom={zoom}
                    options={options}
                >
                    <Marker
                        position={center}
                    />
            </GoogleMap>
            }
        </div>
    );
}

export default GoogleMapComponent;