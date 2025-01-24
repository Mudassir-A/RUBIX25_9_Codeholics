-- Enable required extensions (cube must be created before earthdistance)
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- Create the retail_stores table
CREATE TABLE retail_stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    store_type VARCHAR(50) NOT NULL,
    sustainability_features TEXT[],
    operating_hours JSONB,
    contact_number VARCHAR(20),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create basic index on lat/long
CREATE INDEX idx_retail_stores_location ON retail_stores (latitude, longitude);

-- Sample data
INSERT INTO retail_stores (
    name, description, address, latitude, longitude, store_type, 
    sustainability_features, operating_hours, contact_number, website
) VALUES (
    'EcoRefill Station',
    'Zero-waste store offering refill options for household products',
    '123 Green Street, Eco City',
    40.7128,
    -74.0060,
    'refill_station',
    ARRAY['zero-waste', 'plastic-free', 'organic'],
    '{"monday": "9:00-18:00", "tuesday": "9:00-18:00", "wednesday": "9:00-18:00", "thursday": "9:00-18:00", "friday": "9:00-18:00", "saturday": "10:00-16:00", "sunday": "closed"}',
    '+1-555-0123',
    'www.ecorefill.com'
); 