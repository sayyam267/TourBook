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

export default function BookTourMap({ Width, Height, Places }) {
  const center = { lat: 31.5204, lng: 74.3587 };

  const [location, setLocation] = useState();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBsKW_CHifccy_0JkqchnuoWWucLcslhFs',
    libraries: ['places'],
  });

  const [markers, setmak] = useState([
    {
      id: 0,
      name: 'Lahore',
      position: { lat: 31.5203696, lng: 74.35874729999999 },
    },
  ]);
  const [activeMarker, setActiveMarker] = useState(null);

  const [plac, setPlace] = useState([]);

  const [map, setMap] = useState();

  const [getdata, setGetData] = useState(false);

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
          {markers?.map(({ id, name, position }) => (
            <Marker key={id} position={position} onClick={() => handleActiveMarker(id)}>
              {activeMarker === id ? (
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
