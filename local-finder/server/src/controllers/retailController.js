const pool = require('../config/database');

const retailController = {
  // Find stores within radius
  async findNearbyStores(req, res) {
    const { latitude, longitude, radius = 5, type } = req.query; // radius in km
    
    try {
      let query = `
        SELECT 
          *,
          (
            6371 * acos(
              cos(radians($1)) * cos(radians(latitude)) *
              cos(radians(longitude) - radians($2)) +
              sin(radians($1)) * sin(radians(latitude))
            )
          ) as distance
        FROM sustainable_stores
        WHERE 1=1
      `;
      
      const params = [latitude, longitude, radius];
      
      if (type) {
        query += ` AND store_type = $4`;
        params.push(type);
      }
      
      query += ` HAVING (
        6371 * acos(
          cos(radians($1)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )
      ) <= $3`;
      
      query += ` ORDER BY distance`;
      
      const { rows } = await pool.query(query, params);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get store details
  async getStoreDetails(req, res) {
    const { id } = req.params;
    
    try {
      const { rows } = await pool.query(
        'SELECT * FROM sustainable_stores WHERE id = $1',
        [id]
      );
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Store not found' });
      }
      
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = retailController; 