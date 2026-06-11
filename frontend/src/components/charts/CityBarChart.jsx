import React from 'react';
import ChartCard from '../ChartCard';

const COLORS = ['#6259ca', '#f754a2', '#ff6b81', '#fd7e14', '#05c3fb', '#09ad95', '#f1a91e', '#4b3fa0', '#2dce89', '#f82649'];

const CityBarChart = ({ data }) => {
  const sorted = [...data].sort((a, b) => b.total_revenue - a.total_revenue).slice(0, 10);
  const maxRevenue = Math.max(...sorted.map(d => d.total_revenue || 0));

  return (
    <ChartCard 
      title="Revenue by City" 
      rightAction={<button className="card-link" style={{ border: 'none', background: 'var(--hover-bg)' }}>View All</button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', maxHeight: '280px', overflowY: 'auto', padding: '5px 5px 5px 0' }}>
        {sorted.map((item, idx) => {
          const width = maxRevenue > 0 ? (item.total_revenue / maxRevenue) * 100 : 0;
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '4px', background: 'var(--hover-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold',
                    color: COLORS[idx % COLORS.length]
                  }}>
                    {item.customer_city.charAt(0)}
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: 500 }}>{item.customer_city}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>
                  {Number(item.total_revenue).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'var(--border-light)', borderRadius: '2px' }}>
                <div style={{ width: `${width}%`, height: '100%', background: COLORS[idx % COLORS.length], borderRadius: '2px' }} />
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
};

export default CityBarChart;
