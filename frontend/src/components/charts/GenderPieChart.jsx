import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from '../ChartCard';

const GenderPieChart = ({ data }) => {
  const male = data.find(d => d.gender === 'Male')?.total_revenue || 0;
  const female = data.find(d => d.gender === 'Female')?.total_revenue || 0;
  const total = male + female;
  
  const chartData = [
    { name: 'Total', value: total, fill: '#6259ca' },
    { name: 'Male', value: male, fill: '#e059eb' },
    { name: 'Female', value: female, fill: '#ff6b81' },
  ];

  const maxVal = total || 1;
  const anglePerSlice = 360 / 3;

  return (
    <ChartCard 
      title="Gender Distribution"
      rightAction={<button className="card-link" style={{ border: 'none', background: 'var(--hover-bg)' }}>View All</button>}
    >
      <div style={{ width: '100%', height: '100%', minHeight: '130px', position: 'relative' }}>
        {/* Polar grid background rings */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', height: '70%', borderRadius: '50%', border: '1px solid var(--border-light)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '45%', height: '45%', borderRadius: '50%', border: '1px solid var(--border-light)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20%', height: '20%', borderRadius: '50%', border: '1px solid var(--border-light)' }} />
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {chartData.map((entry, index) => {
              const radiusPercent = (entry.value / maxVal) * 90; // max 90% of available space
              const startAngle = 90 - (index * anglePerSlice);
              const endAngle = 90 - ((index + 1) * anglePerSlice);
              return (
                <Pie
                  key={index}
                  data={[entry]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  startAngle={startAngle}
                  endAngle={endAngle}
                  innerRadius={0}
                  outerRadius={`${radiusPercent}%`}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  <Cell fill={entry.fill} />
                </Pie>
              );
            })}
            <Tooltip />
            <Legend iconSize={12} iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: 13, paddingTop: 10 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default GenderPieChart;
