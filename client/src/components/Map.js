import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude (San Francisco)
};

const Map = () => {
  const [userLocation, setUserLocation] = useState(defaultCenter); // Default location
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          console.log("Fetched User Location: ", newLocation); // Debugging log
          setUserLocation(newLocation); // Update state with user's location
          setError(null);
        },
        (error) => {
          console.error("Geolocation Error: ", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("Location access denied. Please allow location access.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get your location timed out.");
              break;
            default:
              setError("An unknown error occurred while fetching location.");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {error && (
        <div>
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()}>
            Retry Location Access
          </button>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation} // Dynamically update map center
        zoom={12} // Adjust zoom for better visibility
      >
        {/* Render marker only if userLocation is available */}
        {userLocation && <Marker position={userLocation} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
