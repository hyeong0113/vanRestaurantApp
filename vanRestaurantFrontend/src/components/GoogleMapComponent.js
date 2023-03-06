import { useRef, useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GoogleMapComponent = (props) => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAt3MM77NlV_PDgfy_CA4SYmc65-sBOCK8"
    })

    const onLoad = (map) => {
        if(props.topRestaurant && props.topRestaurant !== undefined) {
            setMarkers([...markers, props.geoData]);
            setMarkers([...markers, props.topRestaurant.location]);
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach((marker) => bounds.extend(marker.getPosition()));
            map.fitBounds(bounds);
        }
        console.log(map);
        setMap(map);
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
                    center={{ lat: props.geoData.lat, lng: props.geoData.lng }}
                    zoom={14}
                    onLoad={onLoad}
                    options={options}
                >
                <Marker position={props.geoData} />
                {props.topRestaurant && <Marker position={props.topRestaurant.location} />}
            </GoogleMap>
            }
        </div>
    );
}

export default GoogleMapComponent;
