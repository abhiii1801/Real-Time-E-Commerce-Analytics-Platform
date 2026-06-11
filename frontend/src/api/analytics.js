import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL;

export const getDashboardSummary = async () => {
  const response = await axios.get(
    `${API_BASE}/dashboard-summary`
  );

  return response.data;
};

export const getSalesByCategory = async () => {
  const response = await axios.get(
    `${API_BASE}/sales-by-category`
  );

  return response.data;
};

export const getSalesByCity = async () => {
  const response = await axios.get(
    `${API_BASE}/sales-by-city`
  );

  return response.data;
};

export const getTopProducts = async () => {
  const response = await axios.get(
    `${API_BASE}/top-products`
  );

  return response.data;
};