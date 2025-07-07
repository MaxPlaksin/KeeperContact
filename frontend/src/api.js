import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export async function register(username, password) {
  const res = await axios.post(`${API_URL}/register`, { username, password });
  return res.data;
}

export async function login(username, password) {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  const res = await axios.post(`${API_URL}/token`, params);
  return res.data;
}

export async function getMe() {
  const res = await axios.get(`${API_URL}/users/me`);
  return res.data;
}

export async function getContacts() {
  const res = await axios.get(`${API_URL}/contacts/`);
  return res.data;
}

export async function createContact(contact) {
  const res = await axios.post(`${API_URL}/contacts/`, contact);
  return res.data;
}

export async function uploadPhoto(contactId, file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post(`${API_URL}/contacts/${contactId}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export function getPhotoUrl(filename) {
  return `${API_URL}/photos/${filename}`;
} 