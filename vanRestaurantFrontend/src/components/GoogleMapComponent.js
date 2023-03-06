import { useRef, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GoogleMapComponent = (props) => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([ { lat: props.geoData.lat, lng: props.geoData.lng } ]);
    const [cneter, setCenter] = useState({ lat: props.geoData.lat, lng: props.geoData.lng });
    const [zoom, setZoom] = useState(14);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAt3MM77NlV_PDgfy_CA4SYmc65-sBOCK8"
    })

    useEffect(() => {
        if(props.isTopRestaurantLoading && markers.length < 2) {
            console.log(props.topRestaurant);
            setMarkers(
                [...markers, props.topRestaurant.location
                ]
            );

            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach(marker => {
              bounds.extend(marker);
            });
            setCenter(bounds.getCenter());
            setZoom(10);            
        }
    })

    // const onLoad = (map) => {
    //     if(props.topRestaurant && props.topRestaurant !== undefined) {
    //         setMarkers([...markers, props.geoData]);
    //         setMarkers([...markers, props.topRestaurant.location]);
    //         const bounds = new window.google.maps.LatLngBounds();
    //         markers.forEach((marker) => bounds.extend(marker.getPosition()));
    //         map.fitBounds(bounds);
    //     }
    //     console.log(map);
    //     setMap(map);
    // };

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
                    center={cneter}
                    zoom={zoom}
                    options={options}
                >
                {markers.map((marker, _index) => (
                    <Marker
                        key={_index}
                        position={marker}
                    />
                ))}                 
            </GoogleMap>
            }
        </div>
    );
}

export default GoogleMapComponent;