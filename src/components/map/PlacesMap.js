import { Box, Button, Stack } from '@mui/material';
import React, { useState, useRef,useEffect } from "react";
import {
    GoogleMap,
    InfoWindow,
    Marker,
    Autocomplete,
    useJsApiLoader
} from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import Chip from '@mui/material/Chip';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBsKW_CHifccy_0JkqchnuoWWucLcslhFs");

Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("pk");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

export default function PlacesMap({getPlaces}) {

    const center = { lat: 31.5204, lng: 74.3587 }

    const [location, setLocation] = useState();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBsKW_CHifccy_0JkqchnuoWWucLcslhFs",
        libraries: ["places"]
    })

    const [markers, setmak] = useState([]);

    useEffect(() => { }, [[markers]]);
    const [activeMarker, setActiveMarker] = useState(null);

    const [plac, setPlace] = useState([]);

    const [map, setMap] = useState();
    const [label,setLabel] = useState(false);

    const [meetLocations, setmeetLocations] = useState([]);

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
        console.log("hello load");
        setMap(map);
    };
    const handleBoundsChanged = () => {
        console.log("handleBoundsChanged");
        const Lat = map.getCenter().lat();
        const Lng = map.getCenter().lng();
        const mapCenter = {
            lat: Lat,
            lng: Lng
        };
        map.setCenter(mapCenter);
    };

    const handleLocation = () => {
        console.log("hello");  
        
        setLabel(true);    

    }
    const keyPress = (e) => {
        if (e.keyCode === 13) {
            console.log("value", e.target.value);
            console.log("hello");
            const place = e.target.value;
            Geocode.fromAddress(place).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng, "lat long");
                    const Lat = lat;
                    const Lng = lng;
                    setmak((markers) => [
                        ...markers,
                        {
                            id: markers.length + 1,
                            name: place,
                            position: { lat: Lat, lng: Lng }
                        }
                    ]);
                    console.log(plac);
                    const location = { name: place, location: { lat: Lat, lon: Lng } };
                    setmeetLocations([...meetLocations, location]);
                    getPlaces(meetLocations);
                    const bounds = new window.google.maps.LatLngBounds();
                    markers?.forEach(({ position }) => bounds.extend(position));
                    map.fitBounds(bounds);
                    console.log(map);
                    getPlaces(meetLocations);
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    };
    if (isLoaded) {
        return (
            <>
            
                <Stack spacing={3}>
                    
                    <Stack direction="row" spacing={3}>
                        <Autocomplete>
                            <TextField
                                name="meetLocation"
                                type="text"
                                placeholder="Add Places Of Attraction"
                                onKeyDown={keyPress}
                                ref={originRef}

                            />
                        </Autocomplete>

                        <Button onClick={handleLocation}>Add Location</Button>
                        
                    </Stack>
                    {label ? <Stack direction="row" spacing={1}><h4 sx={{ pt: 1 }} >your meet location:</h4>{meetLocations?.map(({ name}) => (
                        <Chip label={name} />
                    ))} </Stack> : ""}
                 
                
                    <GoogleMap
                        onLoad={handleOnLoad}
                        onClick={() => setActiveMarker(null)}
                        mapContainerStyle={{ width: "45vw", height: "70vh" }}
                        zoom={10}
                        center={markers.length >= 1 ? markers[0]?.position : { lat: 31.5204, lng: 74.3587 }}

                    >
                        {markers?.map(({ id, name, position }) => (
                            <Marker
                                key={id}
                                position={position}
                                onClick={() => handleActiveMarker(id)}
                            >
                                {activeMarker === id ? (
                                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                        <div>{name}</div>
                                    </InfoWindow>
                                ) : null}
                            </Marker>
                        ))}
                    </GoogleMap>
                </Stack>
            </>
        );

    }
    return (<div>Loading</div>)
}