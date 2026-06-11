import React from 'react';
import { CreditCard, Banknote, Smartphone, Wallet } from 'lucide-react';
import ChartCard from '../ChartCard';

const PaymentDonut = ({ data }) => {
  const total = data.reduce((sum, d) => sum + (d.total_revenue || 0), 0);
  
  const getIcon = (method) => {
    const m = method.toLowerCase();
    if (m.includes('cash')) return <Banknote size={18} color="#f82649" />;
    if (m.includes('credit')) return <CreditCard size={18} color="#fd7e14" />;
    if (m.includes('debit')) return <CreditCard size={18} color="#05c3fb" />;
    if (m.includes('upi') || m.includes('net')) return <Smartphone size={18} color="#6259ca" />;
    return <Wallet size={18} color="#09ad95" />;
  };

  const getIconBg = (method) => {
    const m = method.toLowerCase();
    if (m.includes('cash')) return 'rgba(248, 38, 73, 0.1)';
    if (m.includes('credit')) return 'rgba(253, 126, 20, 0.1)';
    if (m.includes('debit')) return 'rgba(5, 195, 251, 0.1)';
    if (m.includes('upi') || m.includes('net')) return 'rgba(98, 89, 202, 0.1)';
    return 'rgba(9, 173, 149, 0.1)';
  };

  return (
    <ChartCard title="Payment Methods">
      <div style={{ padding: '5px 0', display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
        {data.map((item, idx) => {
          const pct = total > 0 ? Math.round((item.total_revenue / total) * 100) : 0;
          return (
            <div key={idx} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 0', borderBottom: idx < data.length - 1 ? '1px solid var(--border-light)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '6px',
                  background: getIconBg(item.payment_method),
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {React.cloneElement(getIcon(item.payment_method), { size: 16 })}
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-dark)', fontWeight: 500 }}>
                  {item.payment_method}
                </span>
              </div>
              <div style={{
                background: '#6259ca', color: '#fff', fontSize: '11px', fontWeight: 600,
                padding: '4px 12px', borderRadius: '12px'
              }}>
                {pct}%
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
};

export default PaymentDonut;
