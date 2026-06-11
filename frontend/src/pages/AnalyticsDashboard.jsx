import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, DollarSign, TrendingUp, BarChart3, Users,
  Percent, Package, AlertTriangle, Warehouse, IndianRupee,
} from 'lucide-react';
import { api } from '../services/api';
import KpiCard from '../components/KpiCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import DataTable from '../components/DataTable';
import RevenueTrendChart from '../components/charts/RevenueTrendChart';
import CategoryBarChart from '../components/charts/CategoryBarChart';
import BrandBarChart from '../components/charts/BrandBarChart';
import CityBarChart from '../components/charts/CityBarChart';
import RegionBarChart from '../components/charts/RegionBarChart';
import CustomerTierDonut from '../components/charts/CustomerTierDonut';
import GenderPieChart from '../components/charts/GenderPieChart';
import PaymentDonut from '../components/charts/PaymentDonut';
import OrderStatusPie from '../components/charts/OrderStatusPie';

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val || 0);

const formatNumber = (val) =>
  new Intl.NumberFormat('en-IN').format(val || 0);

const AnalyticsDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [profit, setProfit] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [salesByBrand, setSalesByBrand] = useState([]);
  const [salesByCity, setSalesByCity] = useState([]);
  const [salesByRegion, setSalesByRegion] = useState([]);
  const [customerTier, setCustomerTier] = useState([]);
  const [gender, setGender] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [
        dashRes, profitRes, invRes, trendRes, catRes, brandRes,
        cityRes, regionRes, tierRes, genderRes, paymentRes,
        statusRes, productsRes, customersRes,
      ] = await Promise.all([
        api.getDashboardSummary().catch(() => null),
        api.getProfitSummary().catch(() => null),
        api.getInventorySummary().catch(() => null),
        api.getSalesTrend().catch(() => []),
        api.getSalesByCategory().catch(() => []),
        api.getSalesByBrand().catch(() => []),
        api.getSalesByCity().catch(() => []),
        api.getSalesByRegion().catch(() => []),
        api.getSalesByCustomerTier().catch(() => []),
        api.getSalesByGender().catch(() => []),
        api.getSalesByPaymentMethod().catch(() => []),
        api.getSalesByOrderStatus().catch(() => []),
        api.getTopProducts().catch(() => []),
        api.getTopCustomers().catch(() => []),
      ]);

      if (dashRes) setDashboard(dashRes);
      if (profitRes) setProfit(profitRes);
      if (invRes) setInventory(invRes);
      if (trendRes.length) setSalesTrend(trendRes);
      if (catRes.length) setSalesByCategory(catRes);
      if (brandRes.length) setSalesByBrand(brandRes);
      if (cityRes.length) setSalesByCity(cityRes);
      if (regionRes.length) setSalesByRegion(regionRes);
      if (tierRes.length) setCustomerTier(tierRes);
      if (genderRes.length) setGender(genderRes);
      if (paymentRes.length) setPaymentMethod(paymentRes);
      if (statusRes.length) setOrderStatus(statusRes);
      if (productsRes.length) setTopProducts(productsRes);
      if (customersRes.length) setTopCustomers(customersRes);
    } catch (error) {
      console.error('Error fetching analytics data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSkeleton type="kpi-row" count={4} />
        <LoadingSkeleton type="chart-row" count={2} />
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb + Title — Xintra style */}
      <div className="page-header">
        <div>
          <div className="page-breadcrumb">
            <a href="/">Dashboards</a> <span>→ Ecommerce</span>
          </div>
          <h1 className="page-title">Ecommerce</h1>
        </div>
      </div>

      {/* === ROW 1: KPI Cards (left column) + Sales Chart (center) + Top Products (right) === */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 320px', gap: '20px', marginBottom: '20px' }}>
        {/* Left: KPI cards stacked vertically — like screenshot */}
        <div className="flex flex-col gap-4">
          <KpiCard
            title="Total Sales"
            value={formatNumber(dashboard?.total_orders)}
            icon={ShoppingCart}
            color="purple"
            style={{ animationDelay: '0.05s' }}
          />
          <KpiCard
            title="Revenue"
            value={formatCurrency(dashboard?.total_revenue)}
            icon={DollarSign}
            color="pink"
            style={{ animationDelay: '0.1s' }}
          />
          <KpiCard
            title="Average Order Value"
            value={formatCurrency(dashboard?.average_order_value)}
            icon={BarChart3}
            color="amber"
            style={{ animationDelay: '0.15s' }}
          />
          <KpiCard
            title="Total Orders"
            value={formatNumber(dashboard?.unique_customers)}
            icon={Users}
            color="success"
            style={{ animationDelay: '0.2s' }}
          />
        </div>

        {/* Center: Sales Report area chart */}
        <RevenueTrendChart data={salesTrend} />

        {/* Right: Top Selling Products — like screenshot */}
        <DataTable
          title="Top-Selling Products"
          maxHeight={380}
          rightAction={<button className="card-link">View All</button>}
          columns={[
            { label: 'Product' },
            { label: 'Revenue', align: 'right' },
          ]}
          data={topProducts.slice(0, 8)}
          renderRow={(p, idx) => (
            <tr key={idx}>
              <td>
                <div className="flex items-center gap-2">
                  <div className="avatar-sm">
                    <Package size={13} />
                  </div>
                  <div>
                    <div className="td-bold" style={{ fontSize: 13, whiteSpace: 'normal', wordBreak: 'break-word', maxWidth: '200px' }}>{p.product_name}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>{p.brand}</div>
                  </div>
                </div>
              </td>
              <td className="text-right">
                <div className="td-bold" style={{ fontSize: 13 }}>{formatCurrency(p.total_revenue)}</div>
                <div className="text-muted" style={{ fontSize: 11 }}>{p.total_orders} Sales</div>
              </td>
            </tr>
          )}
        />
      </div>

      {/* === ROW 2: Recent Orders (left) + Order Status Donut (right) === */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', marginBottom: '20px' }}>
        <DataTable
          title="Recent Orders"
          maxHeight={300}
          rightAction={<button className="card-link">View All</button>}
          columns={[
            { label: 'Product' },
            { label: 'Brand' },
            { label: 'Quantity', align: 'right' },
            { label: 'Revenue', align: 'right' },
            { label: 'Profit', align: 'right' },
          ]}
          data={topProducts}
          renderRow={(p, idx) => (
            <tr key={idx}>
              <td>
                <div className="flex items-center gap-2">
                  <div className="avatar-sm">
                    <Package size={13} />
                  </div>
                  <span className="td-bold">{p.product_name}</span>
                </div>
              </td>
              <td className="td-muted">{p.brand}</td>
              <td className="text-right">{formatNumber(p.total_quantity)}</td>
              <td className="text-right td-bold">{formatCurrency(p.total_revenue)}</td>
              <td className="text-right td-success">{formatCurrency(p.total_profit)}</td>
            </tr>
          )}
        />

        {/* Order Status donut — like "Total Orders" donut in screenshot */}
        <OrderStatusPie data={orderStatus} />
      </div>

      {/* === ROW 3: Profit KPIs + Inventory KPIs === */}
      <div className="section-header">
        <span className="section-title">Profitability & Inventory</span>
        <div className="section-line" />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <KpiCard
          title="Total Profit"
          value={formatCurrency(profit?.total_profit)}
          icon={IndianRupee}
          color="teal"
          style={{ animationDelay: '0.05s' }}
        />
        <KpiCard
          title="Avg Profit / Order"
          value={formatCurrency(profit?.average_profit_per_order)}
          icon={TrendingUp}
          color="blue"
          style={{ animationDelay: '0.1s' }}
        />
        <KpiCard
          title="Profit Margin"
          value={`${(profit?.profit_margin_percent || 0).toFixed(1)}%`}
          icon={Percent}
          color="purple"
          style={{ animationDelay: '0.15s' }}
        />
        <KpiCard
          title="Total Products"
          value={formatNumber(inventory?.total_products)}
          icon={Package}
          color="amber"
          style={{ animationDelay: '0.2s' }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Out of Stock"
          value={formatNumber(inventory?.out_of_stock_products)}
          icon={AlertTriangle}
          color="red"
          style={{ animationDelay: '0.05s' }}
        />
        <KpiCard
          title="Low Stock"
          value={formatNumber(inventory?.low_stock_products)}
          icon={AlertTriangle}
          color="orange"
          style={{ animationDelay: '0.1s' }}
        />
        <KpiCard
          title="Inventory Value"
          value={formatCurrency(inventory?.inventory_value)}
          icon={Warehouse}
          color="success"
          style={{ animationDelay: '0.15s' }}
        />
        <KpiCard
          title="Unique Customers"
          value={formatNumber(dashboard?.unique_customers)}
          icon={Users}
          color="pink"
          style={{ animationDelay: '0.2s' }}
        />
      </div>

      {/* === ROW 4: Category + Brand + City === */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <CategoryBarChart data={salesByCategory} />
        <BrandBarChart data={salesByBrand} />
        <CityBarChart data={salesByCity} />
      </div>

      {/* === ROW 5: Region + Customer Tier + Payment + Gender === */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        <RegionBarChart data={salesByRegion} />
        <CustomerTierDonut data={customerTier} />
        <PaymentDonut data={paymentMethod} />
        <GenderPieChart data={gender} />
      </div>

      {/* === ROW 6: Top Customers === */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '20px' }}>
        <DataTable
          title="Top Customers"
          maxHeight={340}
          rightAction={<button className="card-link">View All</button>}
          columns={[
            { label: 'Customer' },
            { label: 'Tier' },
            { label: 'Orders', align: 'right' },
            { label: 'Total Spent', align: 'right' },
            { label: 'Profit', align: 'right' },
          ]}
          data={topCustomers}
          renderRow={(c, idx) => (
            <tr key={idx}>
              <td>
                <div className="flex items-center gap-2">
                  <div className="avatar-sm">
                    <Users size={13} />
                  </div>
                  <span className="td-bold">{c.customer_name}</span>
                </div>
              </td>
              <td>
                <span className={`badge ${
                  c.customer_tier === 'Gold' ? 'badge-warning' :
                  c.customer_tier === 'Silver' ? 'badge-info' :
                  c.customer_tier === 'Platinum' ? 'badge-primary' : 'badge-success'
                }`}>
                  {c.customer_tier}
                </span>
              </td>
              <td className="text-right">{c.total_orders}</td>
              <td className="text-right td-bold">{formatCurrency(c.total_spent)}</td>
              <td className="text-right td-success">{formatCurrency(c.total_profit)}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
