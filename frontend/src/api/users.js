import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getUsers = async (token) => {
  const response = await axios.get(`${API_URL}/users/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}; 