const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const retailService = {
  async findNearbyStores(latitude, longitude, radius) {
    try {
      const params = new URLSearchParams({
        latitude,
        longitude,
        radius
      });
      
      const response = await fetch(`${API_BASE_URL}/retail/nearby?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stores');
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching nearby stores:', error);
      return [];
    }
  },

  async getStoreDetails(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/retail/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch store details');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching store details:', error);
      throw error;
    }
  }
}; 