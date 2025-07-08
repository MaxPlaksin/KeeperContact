import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const getContacts = async (token, params = {}) => {
  const response = await axios.get(`${API_URL}/contacts/`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return response.data;
};

export const getContact = async (token, id) => {
  const response = await axios.get(`${API_URL}/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createContact = async (token, data) => {
  const response = await axios.post(`${API_URL}/contacts/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateContact = async (token, id, data) => {
  const response = await axios.put(`${API_URL}/contacts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteContact = async (token, id) => {
  const response = await axios.delete(`${API_URL}/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const uploadPhoto = async (token, id, file) => {
  const formData = new FormData();
  formData.append('photo', file);
  const response = await axios.post(`${API_URL}/contacts/${id}/photo`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}; 