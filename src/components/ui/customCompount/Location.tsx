"use client"
import { getLocationFallback } from "@/lib/lib";
import { log } from "console";
import { useEffect, useState } from "react";

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

export default function Location() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLocation();
  }, []);
// getLocationFallback();

  return (
    <div>
      <h1>Location Tracker</h1>
      {userLocation ? (
        <p>
          Your location: Latitude {userLocation.latitude}, Longitude{" "}
          {userLocation.longitude}
        </p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
