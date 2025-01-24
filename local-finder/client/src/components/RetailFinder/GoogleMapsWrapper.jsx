import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places', 'geometry'];

const GoogleMapsWrapper = ({ children }) => {
  useEffect(() => {
    console.log('API Key:', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    version: "weekly"
  });

  if (loadError) {
    console.error('Google Maps load error:', loadError);
    return (
      <div className="error-message">
        Error loading Google Maps. Please check your internet connection and try again.
        {loadError.message && <p>{loadError.message}</p>}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="loading">
        Loading Google Maps...
      </div>
    );
  }

  return <>{children}</>;
};

export default GoogleMapsWrapper; 