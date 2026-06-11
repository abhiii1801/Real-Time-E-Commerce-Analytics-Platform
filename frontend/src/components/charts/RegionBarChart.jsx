import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import ChartCard from '../ChartCard';

const COLORS = ['#6259ca', '#09ad95', '#f1a91e', '#f82649', '#f754a2'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{d.customer_region}</div>
      <div className="tooltip-row">
        <div className="tooltip-dot" style={{ background: payload[0].fill || payload[0].color }} />
        <span>₹{Number(d.total_revenue).toLocaleString('en-IN')}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
        {d.total_orders} orders
      </div>
    </div>
  );
};

const RegionBarChart = ({ data }) => {
  return (
    <ChartCard title="Revenue by Region">
      <div style={{ width: '100%', height: '100%', minHeight: '130px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--border-color)" strokeOpacity={0.5} />
            <XAxis
              dataKey="customer_region"
              stroke="var(--text-light)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-light)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--hover-bg)', radius: 5 }} />
            <Bar dataKey="total_revenue" radius={[8, 8, 0, 0]} animationDuration={1000} animationEasing="ease-out">
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default RegionBarChart;
