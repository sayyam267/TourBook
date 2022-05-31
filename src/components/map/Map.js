import React,{useState} from 'react';
import { Box, Flex} from '@mui/material';
import {useJsApiLoader,GoogleMap} from '@react-google-maps/api';


export default function Map(){

    const GOOGLE_API_KEY = "AIzaSyAp9crp8OwOAjwJqsXai0wOAIBKrw4O32U";

    const center = {lat:48.845,lng:2.2945}

    const {isLoaded} = useJsApiLoader({
        googleMapsApikey: GOOGLE_API_KEY
    })

    if(isLoaded){
        return(
            <Box position="relative" flexDirection="column" align="center" h='100vh' w='100vh'>
        <GoogleMap center={center} zoom={15} mapContainerStyle={{width:'100%',height:'100%'}}>abc</GoogleMap>
            </Box>
        )
        
    }
    return (<div>Loading</div>)
        
    // const [address,setAddress] = useState();
    // const [city,setCity] = useState();
    // const [mapPosition,setMapPosition] = useState();
    // const [markerpos,setMarkerPos] = useState();


}