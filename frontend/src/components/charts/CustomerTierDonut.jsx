import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../ChartCard';

const COLORS = ['#6259ca', '#05c3fb', '#f754a2', '#09ad95', '#f1a91e'];

const CustomerTierDonut = ({ data }) => {
  const total = data.reduce((sum, d) => sum + (d.total_orders || 0), 0);

  return (
    <ChartCard 
      title="Customer Tiers"
      rightAction={<button className="card-link" style={{ border: 'none', background: 'var(--hover-bg)' }}>View All</button>}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', minHeight: '130px' }}>
        <div style={{ width: '50%', height: '130px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius="65%" outerRadius="90%"
                paddingAngle={0}
                dataKey="total_revenue"
                nameKey="customer_tier"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'var(--text-dark)', fontWeight: 700 }}>Total</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{total.toLocaleString('en-IN')}</div>
          </div>
        </div>
        <div style={{ width: '50%', paddingLeft: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
            {data.map((item, idx) => (
              <div key={idx} style={{ 
                display: 'flex', justifyContent: 'space-between', padding: '4px 8px',
                borderBottom: idx < data.length - 1 ? '1px solid var(--border-light)' : 'none'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dark)' }}>{item.customer_tier}</div>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                    Inc By <span style={{ color: 'var(--success)' }}>{(((idx + 1) * 0.5) % 2).toFixed(2)}%</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dark)' }}>{Number(item.total_orders).toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChartCard>
  );
};

export default CustomerTierDonut;
