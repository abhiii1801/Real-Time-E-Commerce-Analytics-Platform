import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import ChartCard from '../ChartCard';

const COLORS = ['#6259ca', '#f754a2', '#09ad95', '#f1a91e', '#05c3fb', '#fd7e14', '#ff6b81', '#4b3fa0', '#2dce89', '#f82649'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{d.category}</div>
      <div className="tooltip-row">
        <div className="tooltip-dot" style={{ background: payload[0].fill || payload[0].color }} />
        <span>₹{Number(d.total_revenue).toLocaleString('en-IN')}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
        {d.total_orders} orders · {d.total_quantity} qty
      </div>
    </div>
  );
};

const CategoryBarChart = ({ data }) => {
  return (
    <ChartCard title="Revenue by Category">
      <div style={{ width: '100%', height: '100%', minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 25, left: 0, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="var(--border-color)" strokeOpacity={0.5} />
            <XAxis
              type="number"
              stroke="var(--text-light)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <YAxis
              dataKey="category"
              type="category"
              width={80}
              stroke="var(--text-light)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--hover-bg)', radius: 5 }} />
            <Bar dataKey="total_revenue" radius={[0, 8, 8, 0]} animationDuration={1000} animationEasing="ease-out">
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

export default CategoryBarChart;
