import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icons for different store types
const createCustomIcon = (color) => new L.Icon({
  iconUrl: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const icons = {
  zero_waste: createCustomIcon('#4CAF50'),      // Green
  refill_station: createCustomIcon('#2196F3'),  // Blue
  ethical_marketplace: createCustomIcon('#FF9800') // Orange
};

// Default icon for fallback
const defaultIcon = new L.Icon.Default();

function MapUpdater({ center, stores }) {
  const map = useMap();
  
  useEffect(() => {
    if (stores && stores.length > 0) {
      const bounds = L.latLngBounds(stores.map(store => [store.latitude, store.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView([center.lat, center.lng], 11);
    }
  }, [center, stores, map]);

  return null;
}

const RetailMap = ({ center, stores = [], selectedTypes }) => {
  const mapRef = useRef();

  const filteredStores = selectedTypes.length > 0 
    ? stores.filter(store => selectedTypes.includes(store.store_type))
    : stores;

  return (
    <div style={{ height: '65vh', width: '100%' }}>
      <MapContainer
        center={[18.8, 73.3]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <MapUpdater center={center} stores={filteredStores} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {filteredStores.map(store => (
          <Marker
            key={store.id}
            position={[parseFloat(store.latitude), parseFloat(store.longitude)]}
            icon={icons[store.store_type] || defaultIcon}
          >
            <Popup>
              <div className="store-popup">
                <h3 className="store-name">{store.name}</h3>
                <p className="store-type">
                  {store.store_type.replace('_', ' ').toUpperCase()}
                </p>
                <p className="store-address">{store.address}</p>
                <p>{store.description}</p>
                {store.sustainability_features && (
                  <div className="store-features">
                    {store.sustainability_features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
                <div className="contact-info">
                  {store.website && (
                    <a href={store.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  )}
                  {store.contact_number && (
                    <a href={`tel:${store.contact_number}`}>
                      {store.contact_number}
                    </a>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RetailMap; 