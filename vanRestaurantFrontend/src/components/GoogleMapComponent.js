import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GoogleMapComponent = (props) => {
    // start google map
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAt3MM77NlV_PDgfy_CA4SYmc65-sBOCK8"
    })

    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(20);

    const onLoad = useCallback(function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(props.geoData);
      map.fitBounds(bounds);
  
      setMap(map)
    }, [])
  
    const onUnmount = useCallback(function callback(map) {
      setMap(null)
    }, [])  
    // end google map

    const containerStyle = {
        width: '800px',
        height: '800px'
      };
  
    return (
        <div>
            {console.log(zoom)}
            {isLoaded &&
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{ lat: props.geoData.lat, lng: props.geoData.lng, zoom: zoom }}
                    defaultZoom={zoom}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                <Marker position={props.geoData} />
                <></>
            </GoogleMap>
            }
        </div>
    );
}

export default GoogleMapComponent;
