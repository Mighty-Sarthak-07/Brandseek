import axios from 'axios';

const API_BASE_URL = 'https://68989099ddf05523e55f3999.mockapi.io/api/v1';

// Fetch all brands
export const fetchBrands = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Brandlist`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

// Fetch a single brand by ID
export const fetchBrandById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Brandlist/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching brand with ID ${id}:`, error);
    throw error;
  }
};
