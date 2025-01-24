-- Drop existing table if exists
DROP TABLE IF EXISTS sustainable_stores;

-- Create table
CREATE TABLE sustainable_stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    store_type VARCHAR(50) NOT NULL,  -- 'zero_waste', 'refill_station', 'ethical_marketplace'
    description TEXT,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    sustainability_features TEXT[], -- Array of features like 'plastic-free', 'organic', 'fair-trade'
    operating_hours JSONB,
    contact_number VARCHAR(20),
    website VARCHAR(255),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO sustainable_stores (
    name, store_type, description, address, latitude, longitude, 
    sustainability_features, operating_hours, contact_number, website
) VALUES 
(
    'EcoRefill Hub',
    'refill_station',
    'Bring your own containers to refill household cleaners, personal care products, and pantry items.',
    '123 Green Street, New York, NY',
    40.7128,
    -74.0060,
    ARRAY['bulk-refill', 'plastic-free', 'organic-products'],
    '{"monday":"09:00-18:00","tuesday":"09:00-18:00","wednesday":"09:00-18:00","thursday":"09:00-18:00","friday":"09:00-18:00","saturday":"10:00-16:00"}',
    '+1-555-0123',
    'www.ecorefillhub.com'
),
(
    'Zero Waste Market',
    'zero_waste',
    'Package-free grocery store with local produce and sustainable products.',
    '456 Earth Ave, New York, NY',
    40.7150,
    -74.0080,
    ARRAY['zero-waste', 'local-produce', 'package-free'],
    '{"monday":"08:00-20:00","tuesday":"08:00-20:00","wednesday":"08:00-20:00","thursday":"08:00-20:00","friday":"08:00-20:00","saturday":"09:00-18:00","sunday":"09:00-16:00"}',
    '+1-555-0124',
    'www.zerowastenyc.com'
),
(
    'Ethical Trade Center',
    'ethical_marketplace',
    'Fair trade products, artisanal crafts, and sustainable fashion.',
    '789 Fair Way, New York, NY',
    40.7180,
    -74.0040,
    ARRAY['fair-trade', 'ethical-fashion', 'artisanal'],
    '{"monday":"10:00-19:00","tuesday":"10:00-19:00","wednesday":"10:00-19:00","thursday":"10:00-19:00","friday":"10:00-19:00","saturday":"10:00-17:00"}',
    '+1-555-0125',
    'www.ethicaltradecenter.com'
);

-- Insert Indian zero-waste stores
INSERT INTO sustainable_stores (
    name, store_type, description, address, latitude, longitude, 
    sustainability_features, operating_hours, contact_number, website
) VALUES 
(
    'Adrish Zerowaste Organic Store Bandra',
    'zero_waste',
    'Zero waste organic store promoting sustainable living',
    'Shop No 1, Dheeraj Presidency, Turner Road, Bandra West, Mumbai, Maharashtra 400050',
    19.0596,
    72.8295,
    ARRAY['zero-waste', 'organic', 'plastic-free', 'local-produce'],
    '{"monday":"10:00-20:00","tuesday":"10:00-20:00","wednesday":"10:00-20:00","thursday":"10:00-20:00","friday":"10:00-20:00","saturday":"10:00-20:00","sunday":"10:00-20:00"}',
    '+91-9820198201',
    'https://adrish.co.in'
),
(
    'ReCircle Head Office',
    'refill_station',
    'Swachh Sustainable Solutions Pvt. Ltd - Promoting zero waste lifestyle',
    'Mumbai, Maharashtra',
    19.0760,
    72.8777,
    ARRAY['refill-station', 'sustainable-solutions', 'zero-waste'],
    '{"monday":"09:00-18:00","tuesday":"09:00-18:00","wednesday":"09:00-18:00","thursday":"09:00-18:00","friday":"09:00-18:00","saturday":"09:00-14:00"}',
    '+91-9876543210',
    'https://recircle.in'
),
(
    'SustAINida',
    'zero_waste',
    'Sustainable living store with eco-friendly products',
    'Mumbai, Maharashtra',
    19.0821,
    72.8416,
    ARRAY['sustainable', 'eco-friendly', 'zero-waste'],
    '{"monday":"10:00-19:00","tuesday":"10:00-19:00","wednesday":"10:00-19:00","thursday":"10:00-19:00","friday":"10:00-19:00","saturday":"10:00-19:00"}',
    '+91-9898989898',
    'https://sustainida.com'
),
(
    'Adrish Zero Waste Organic Store - Aundh',
    'zero_waste',
    'Zero waste organic store promoting sustainable living in Pune',
    'Survey No 41/42, Sai Chambers, ITI Road, Aundh, Pune, Maharashtra 411007',
    18.5589,
    73.8074,
    ARRAY['zero-waste', 'organic', 'plastic-free', 'local-produce'],
    '{"monday":"10:00-20:00","tuesday":"10:00-20:00","wednesday":"10:00-20:00","thursday":"10:00-20:00","friday":"10:00-20:00","saturday":"10:00-20:00","sunday":"10:00-20:00"}',
    '+91-9820198202',
    'https://adrish.co.in'
),
(
    'Adrish Zero Waste Organic Store - Wakad',
    'zero_waste',
    'Zero waste organic store in Wakad, Pune',
    'Shop No 6, Riddhi Siddhi Avenue, Wakad, Pune, Maharashtra 411057',
    18.5907,
    73.7575,
    ARRAY['zero-waste', 'organic', 'plastic-free', 'local-produce'],
    '{"monday":"10:00-20:00","tuesday":"10:00-20:00","wednesday":"10:00-20:00","thursday":"10:00-20:00","friday":"10:00-20:00","saturday":"10:00-20:00","sunday":"10:00-20:00"}',
    '+91-9820198203',
    'https://adrish.co.in'
); 