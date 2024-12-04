import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749, // Default latitude
  lng: -122.4194, // Default longitude
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={"AIzaSyCm6ZwWVGotswtlCaLJkpXkBUZnVaL24Z4"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Example marker */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
