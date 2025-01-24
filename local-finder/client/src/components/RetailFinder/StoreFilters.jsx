import React from 'react';

const StoreFilters = ({ selectedTypes, onTypeChange, stores = [] }) => {
  const storeTypes = [
    { id: 'zero_waste', label: 'Zero Waste Stores', icon: '♻️' },
    { id: 'refill_station', label: 'Refill Stations', icon: '💧' },
    { id: 'ethical_marketplace', label: 'Ethical Marketplaces', icon: '🏪' }
  ];

  const getStoreCount = (type) => {
    if (!Array.isArray(stores)) return 0;
    return stores.filter(store => store.store_type === type).length;
  };

  return (
    <div className="store-filters">
      {storeTypes.map(type => (
        <label key={type.id} className="filter-option">
          <input
            type="checkbox"
            checked={selectedTypes.includes(type.id)}
            onChange={(e) => {
              if (e.target.checked) {
                onTypeChange([...selectedTypes, type.id]);
              } else {
                onTypeChange(selectedTypes.filter(t => t !== type.id));
              }
            }}
          />
          <span className="filter-icon">{type.icon}</span>
          {type.label}
          <span className="store-count">({getStoreCount(type.id)})</span>
        </label>
      ))}
    </div>
  );
};

export default StoreFilters; 