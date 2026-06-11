import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import ChartCard from '../ChartCard';
import { TrendingUp } from 'lucide-react';

const COLORS = ['#6259ca', '#f754a2', '#ff6b81', '#fd7e14', '#09ad95', '#05c3fb'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{d.name}</div>
      <div className="tooltip-row">
        <div className="tooltip-dot" style={{ background: d.payload.fill }} />
        <span>{d.payload.total_orders} orders</span>
      </div>
    </div>
  );
};

const OrderStatusPie = ({ data }) => {
  const total = data.reduce((sum, d) => sum + (d.total_orders || 0), 0);

  return (
    <ChartCard 
      title="Order Statistics"
      rightAction={<button className="card-link" style={{ border: 'none', background: 'none' }}>Earnings ?</button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
        {/* Top section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
          <div style={{ background: 'rgba(98, 89, 202, 0.1)', padding: '10px', borderRadius: '8px', color: '#6259ca' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Orders</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-dark)' }}>{total.toLocaleString('en-IN')}</span>
              <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 600 }}>↗ 0.57%</span>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', height: '220px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={110}
                paddingAngle={0}
                dataKey="total_orders"
                nameKey="order_status"
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                iconType="circle" 
                iconSize={8} 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ fontSize: 13, paddingTop: 10 }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', bottom: '25%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <div style={{ fontSize: 24, color: 'var(--text-dark)', fontWeight: 700 }}>Total</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{total.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>
    </ChartCard>
  );
};

export default OrderStatusPie;
