import React, { useState, useEffect } from 'react';
import RetailMap from './RetailMap';
import SearchBar from './SearchBar';
import StoreFilters from './StoreFilters';
import { retailService } from '../../services/retailService';
import '../../styles/retailFinder.css';

const RetailFinderPage = () => {
  const [stores, setStores] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(['zero_waste']);
  const [center, setCenter] = useState({
    lat: 19.0760,
    lng: 72.8777
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNearbyStores = async (lat, lng) => {
    try {
      setLoading(true);
      setError(null);
      const data = await retailService.findNearbyStores(lat, lng, 10);
      setStores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setError('Failed to fetch stores');
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCenter(newCenter);
          fetchNearbyStores(newCenter.lat, newCenter.lng);
        },
        () => {
          fetchNearbyStores(center.lat, center.lng);
        }
      );
    }
  }, []);

  const handleLocationSelect = (location) => {
    setCenter(location);
    fetchNearbyStores(location.lat, location.lng);
  };

  return (
    <div className="retail-finder">
      <h2>Find Sustainable Stores Near You</h2>
      <SearchBar onLocationSelect={handleLocationSelect} />
      <StoreFilters
        selectedTypes={selectedTypes}
        onTypeChange={setSelectedTypes}
        stores={stores}
      />
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading stores...</div>
      ) : (
        <RetailMap
          center={center}
          stores={stores}
          selectedTypes={selectedTypes}
          onStoreSelect={(store) => console.log('Selected store:', store)}
        />
      )}
    </div>
  );
};

export default RetailFinderPage; 