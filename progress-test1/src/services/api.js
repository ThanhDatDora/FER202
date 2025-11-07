// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

// ===== users =====
export const getUsers = async () => {
  const { data } = await API.get('/users');
  return data;
};

// ===== payments (theo db.json: userId, semester, courseName, amount, date) =====
export const getPayments = async (params = {}) => {
  const { data } = await API.get('/payments', { params });
  return data;
};

export const getPaymentById = async (id) => {
  const { data } = await API.get(`/payments/${id}`);
  return data;
};

export const createPayment = async (payload) => {
  const { data } = await API.post('/payments', payload);
  return data;
};

export const updatePayment = async (id, payload) => {
  const { data } = await API.put(`/payments/${id}`, payload);
  return data;
};

export const deletePayment = async (id) => {
  await API.delete(`/payments/${id}`);
  return true;
};
