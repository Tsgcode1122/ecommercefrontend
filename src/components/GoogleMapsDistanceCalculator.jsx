import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
} from "@react-google-maps/api";

const GoogleMapsDistanceCalculator = () => {
  const [userAddress, setUserAddress] = useState("");
  const [distance, setDistance] = useState(null);
  // const fixedStartingPoint = { lat: , lng:  };

  const calculateDistance = () => {
    // Use Google Maps Geocoding API to convert user's inputted address to coordinates
    // Once you have the coordinates, you can calculate the distance using the Haversine formula or Google Maps Distance Matrix API
    // For simplicity, we will just set a placeholder distance value
    setDistance(10); // Placeholder distance in kilometers
  };

  return (
    <div>
      <input
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Enter your address"
      />
      <button onClick={calculateDistance}>Calculate Distance</button>
      {distance && <p>Distance: {distance} km</p>}
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={fixedStartingPoint}
          zoom={10}
        >
          {/* Display fixed starting point marker */}
          <Marker position={fixedStartingPoint} />

          {/* Display user-inputted address marker (optional) */}
          {/* <Marker position={userAddressCoordinates} /> */}

          {/* Display directions between fixed starting point and user-inputted address (optional) */}
          {userAddress && (
            <DirectionsService
              options={{
                destination: userAddress,
                origin: fixedStartingPoint,
                travelMode: "DRIVING",
              }}
              callback={(response) => {
                if (response !== null) {
                  console.log(response);
                }
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapsDistanceCalculator;
