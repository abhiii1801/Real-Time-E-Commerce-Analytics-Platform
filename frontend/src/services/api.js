import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Page 1: Analytics
  getDashboardSummary: () => apiClient.get('/dashboard-summary').then(res => res.data),
  getProfitSummary: () => apiClient.get('/profit-summary').then(res => res.data),
  getInventorySummary: () => apiClient.get('/inventory-summary').then(res => res.data),
  getSalesTrend: () => apiClient.get('/sales-trend').then(res => res.data),
  getSalesByCategory: () => apiClient.get('/sales-by-category').then(res => res.data),
  getSalesByBrand: () => apiClient.get('/sales-by-brand').then(res => res.data),
  getSalesByCity: () => apiClient.get('/sales-by-city').then(res => res.data),
  getSalesByRegion: () => apiClient.get('/sales-by-region').then(res => res.data),
  getSalesByCustomerTier: () => apiClient.get('/sales-by-customer-tier').then(res => res.data),
  getSalesByGender: () => apiClient.get('/sales-by-gender').then(res => res.data),
  getSalesByPaymentMethod: () => apiClient.get('/sales-by-payment-method').then(res => res.data),
  getSalesByOrderStatus: () => apiClient.get('/sales-by-order-status').then(res => res.data),
  getTopProducts: () => apiClient.get('/top-products').then(res => res.data),
  getTopCustomers: () => apiClient.get('/top-customers').then(res => res.data),

  // Page 2: Live Orders
  getRecentOrders: () => apiClient.get('/recent-orders').then(res => res.data),
  getLiveStats: () => apiClient.get('/live-stats').then(res => res.data),

  // Page 3: Monitoring
  getSystemHealth: () => apiClient.get('/system-health').then(res => res.data),
  getDataQuality: () => apiClient.get('/data-quality').then(res => res.data),
};
