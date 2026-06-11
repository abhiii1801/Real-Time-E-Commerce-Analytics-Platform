import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import ChartCard from '../ChartCard';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">
        {new Date(label).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      {payload.map((entry, i) => (
        <div key={i} className="tooltip-row">
          <div className="tooltip-dot" style={{ background: entry.color }} />
          <span>{entry.name}: ₹{Number(entry.value).toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
};

const CustomDot = ({ cx, cy, stroke }) => (
  <circle cx={cx} cy={cy} r={4} fill="#fff" stroke={stroke} strokeWidth={2.5} />
);

const RevenueTrendChart = ({ data }) => {
  return (
    <ChartCard
      title="Sales Report"
      rightAction={
        <div className="chart-legend-inline">
          <span><span className="chart-legend-dot" style={{ background: '#6259ca' }} />Sales</span>
          <span><span className="chart-legend-dot" style={{ background: '#09ad95' }} />Profit</span>
          <span><span className="chart-legend-dot" style={{ background: '#f754a2' }} />Expenses</span>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6259ca" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#6259ca" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#09ad95" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#09ad95" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="var(--border-color)"
            strokeOpacity={0.6}
          />
          <XAxis
            dataKey="minute_bucket"
            tickFormatter={(val) => new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            stroke="var(--text-light)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="var(--text-light)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            dx={-5}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* Main purple filled area — solid line */}
          <Area
            type="natural"
            dataKey="total_revenue"
            name="Sales"
            stroke="#6259ca"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#gradRevenue)"
            dot={<CustomDot stroke="#6259ca" />}
            activeDot={{ r: 6, strokeWidth: 3, fill: '#fff', stroke: '#6259ca' }}
            animationDuration={1200}
            animationEasing="ease-in-out"
          />
          {/* Pink dashed line — no fill, like screenshot */}
          <Area
            type="natural"
            dataKey="total_profit"
            name="Profit"
            stroke="#f754a2"
            strokeWidth={2}
            strokeDasharray="6 4"
            fillOpacity={0}
            fill="transparent"
            dot={<CustomDot stroke="#f754a2" />}
            activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#f754a2' }}
            animationDuration={1400}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RevenueTrendChart;
