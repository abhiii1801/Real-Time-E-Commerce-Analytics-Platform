import React from 'react';
import ChartCard from '../ChartCard';

const COLORS = ['#6259ca', '#f754a2', '#ff6b81', '#fd7e14', '#05c3fb', '#09ad95', '#f1a91e', '#4b3fa0', '#2dce89', '#f82649'];

const BrandBarChart = ({ data }) => {
  const top10 = [...data]
    .sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(0, 10);
    
  const totalRevenue = top10.reduce((sum, d) => sum + (d.total_revenue || 0), 0);

  return (
    <ChartCard 
      title="Top 10 Brands"
      rightAction={<select className="card-link" style={{ padding: '4px 8px', border: 'none', background: 'var(--hover-bg)' }}><option>Sort By</option></select>}
    >
      {/* Top segment bar */}
      <div style={{ display: 'flex', height: '6px', width: '100%', borderRadius: '3px', overflow: 'hidden', gap: '2px', marginBottom: '15px' }}>
        {top10.slice(0, 5).map((item, idx) => {
          const width = totalRevenue > 0 ? (item.total_revenue / totalRevenue) * 100 : 0;
          return <div key={idx} style={{ width: `${width}%`, background: COLORS[idx % COLORS.length] }} />;
        })}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-default)', fontWeight: 500 }}>Overall Sales</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 600 }}>2.74% ↑</span>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)' }}>{totalRevenue.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '280px', overflowY: 'auto', paddingRight: '5px' }}>
        {top10.map((item, idx) => {
          const pct = totalRevenue > 0 ? ((item.total_revenue / totalRevenue) * 100).toFixed(0) : 0;
          const isUp = idx % 2 === 0;
          const itemColor = COLORS[idx % COLORS.length];
          return (
            <div key={idx} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'center',
              padding: '12px 0', borderBottom: idx < top10.length - 1 ? '1px solid var(--border-light)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${itemColor}` }} />
                <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: 600 }}>{item.brand}</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-default)' }}>
                {Number(item.total_revenue).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {pct}% Gross
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: itemColor, color: '#fff', fontSize: '11px', fontWeight: 600,
                  padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  {(((idx + 1) * 0.7) % 2).toFixed(2)}% {isUp ? '↗' : '↘'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
};

export default BrandBarChart;
