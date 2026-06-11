import React, { useState, useEffect, useRef } from 'react';
import {
  Activity, Zap, CreditCard, Users, MapPin, Clock, User,
} from 'lucide-react';
import { api } from '../services/api';
import KpiCard from '../components/KpiCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val || 0);

const getStatusClass = (status) => {
  if (!status) return '';
  const s = status.toLowerCase();
  return `status-${s}`;
};

const LiveOrders = () => {
  const [liveStats, setLiveStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevOrderIdsRef = useRef(new Set());

  const fetchData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        api.getLiveStats().catch(() => null),
        api.getRecentOrders().catch(() => []),
      ]);

      if (statsRes) setLiveStats(statsRes);
      if (ordersRes && ordersRes.length > 0) {
        const newIds = new Set(ordersRes.map((o) => o.order_id));
        const prevIds = prevOrderIdsRef.current;
        const hasNewOrders = [...newIds].some((id) => !prevIds.has(id));

        if (hasNewOrders || prevIds.size === 0) {
          setOrders(ordersRes.map((o) => ({
            ...o,
            _isNew: !prevIds.has(o.order_id),
          })));
        }
        prevOrderIdsRef.current = newIds;
      }
    } catch (error) {
      console.error('Error fetching live data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSkeleton type="kpi-row" count={4} />
        <LoadingSkeleton type="chart" />
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb + Title */}
      <div className="page-header">
        <div className="flex items-center gap-2">
          <div>
            <div className="page-breadcrumb">
              <a href="/">Dashboards</a> <span>→ Live Orders</span>
            </div>
            <h1 className="page-title">Live Orders Feed</h1>
          </div>
          <div className="live-badge" style={{ marginLeft: 12 }}>
            <div className="live-badge-dot" />
            LIVE
          </div>
        </div>
      </div>

      {/* Live Stats KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <KpiCard
          title="Orders (Last Min)"
          value={liveStats?.orders_last_minute ?? 0}
          icon={Activity}
          color="red"
          style={{ animationDelay: '0.05s' }}
        />
        <KpiCard
          title="Orders (Last 5 Min)"
          value={liveStats?.orders_last_5_minutes ?? 0}
          icon={Zap}
          color="amber"
          style={{ animationDelay: '0.1s' }}
        />
        <KpiCard
          title="Revenue (Last Hr)"
          value={formatCurrency(liveStats?.revenue_last_hour)}
          icon={CreditCard}
          color="success"
          style={{ animationDelay: '0.15s' }}
        />
        <KpiCard
          title="Active Customers"
          value={liveStats?.active_customers ?? 0}
          icon={Users}
          color="purple"
          style={{ animationDelay: '0.2s' }}
        />
      </div>

      {/* Orders Table */}
      <div className="data-table-wrapper">
        <div className="data-table-header">
          <span className="data-table-title">Recent Transactions</span>
          <span className="text-sm text-muted">{orders.length} orders</span>
        </div>
        <div className="data-table-scroll" style={{ maxHeight: 'calc(100vh - 320px)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Location</th>
                <th>Payment</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <div className="empty-state-icon">
                        <Activity size={18} />
                      </div>
                      <span>Waiting for new orders...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className={order._isNew ? 'live-order-row' : ''}
                  >
                    <td>
                      <span className="td-primary">
                        #{order.order_id.replace('ORD_', '')}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar-sm">
                          <User size={12} />
                        </div>
                        {order.customer_name}
                      </div>
                    </td>
                    <td>{order.product_name}</td>
                    <td>
                      <div className="flex items-center gap-1 text-muted">
                        <MapPin size={12} />
                        {order.customer_city}
                      </div>
                    </td>
                    <td>{order.payment_method}</td>
                    <td className="text-right td-bold">
                      {formatCurrency(order.total_amount)}
                    </td>
                    <td>
                      <span className={getStatusClass(order.order_status)}>
                        {order.order_status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-muted text-xs">
                        <Clock size={11} />
                        {new Date(order.order_timestamp).toLocaleTimeString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveOrders;
