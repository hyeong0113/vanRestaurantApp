import { useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GoogleMapComponent = (props) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAt3MM77NlV_PDgfy_CA4SYmc65-sBOCK8"
    })

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);

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
                    center={{ lat: props.geoData.lat, lng: props.geoData.lng }}
                    zoom={14}
                    onLoad={onMapLoad}
                    options={options}
                >
                <Marker position={props.geoData} />
            </GoogleMap>
            }
        </div>
    );
}

export default GoogleMapComponent;
