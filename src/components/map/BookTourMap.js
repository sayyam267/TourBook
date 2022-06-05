import { Box, Button, Stack } from '@mui/material';
import React, { useState, useRef } from 'react';
import { GoogleMap, InfoWindow, Marker, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyBsKW_CHifccy_0JkqchnuoWWucLcslhFs');

Geocode.setLanguage('en');

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion('pk');
Geocode.setLocationType('ROOFTOP');
Geocode.enableDebug();

export default function BookTourMap({ Width, Height,location}) {
  const center = { lat: 31.5204, lng: 74.3587 };

  console.log("location",location);
 

  const [markers, setmak] = useState([]);


  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBsKW_CHifccy_0JkqchnuoWWucLcslhFs',
    libraries: ['places'],
  });


  
  const [activeMarker, setActiveMarker] = useState(null);

  const [plac, setPlace] = useState([]);

  const [map, setMap] = useState();

  const [Location,setLocation] =useState();

  // const [arr,setarr] = useState();


  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    
    console.log("the markers",markers);
    markers?.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
    console.log(map);
    setMap(map);
  };

  const handleBoundsChanged = () => {
    console.log('handleBoundsChanged');
    const Lat = map.getCenter().lat();
    const Lng = map.getCenter().lng();
    const mapCenter = {
      lat: Lat,
      lng: Lng,
    };
    map.setCenter(mapCenter);
  };

  const handleLocation = () => {
    console.log(originRef.current.value);
  };
  if (isLoaded) {
    return (
      <>
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          mapContainerStyle={{ width: Width, height: Height }}
        >
          {location?.map(({name, location }) => ( 
            <Marker key={name} position={location} onClick={() => handleActiveMarker(name)}>
              {activeMarker === name ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </>
    );
  }
  return <div>Loading</div>;
}
