import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import LiveOrders from './pages/LiveOrders';
import MonitoringDashboard from './pages/MonitoringDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AnalyticsDashboard />} />
          <Route path="live" element={<LiveOrders />} />
          <Route path="monitoring" element={<MonitoringDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;