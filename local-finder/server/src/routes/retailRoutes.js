const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get stores by location and radius
router.get('/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    
    // Modified query to use a subquery for the distance calculation
    const query = `
      WITH store_distances AS (
        SELECT 
          *,
          ( 6371 * acos( cos( radians($1) ) * 
            cos( radians(latitude) ) * 
            cos( radians(longitude) - radians($2) ) + 
            sin( radians($1) ) * 
            sin( radians(latitude) ) 
          )) AS distance
        FROM sustainable_stores
      )
      SELECT *
      FROM store_distances
      WHERE distance < $3
      ORDER BY distance;
    `;
    
    const result = await pool.query(query, [latitude, longitude, radius]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching nearby stores:', error);
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
});

// Get store details by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM sustainable_stores WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Store not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching store details:', error);
    res.status(500).json({ error: 'Failed to fetch store details' });
  }
});

module.exports = router; 