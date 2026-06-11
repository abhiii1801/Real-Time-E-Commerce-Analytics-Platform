import React from 'react';

const KpiCard = ({ title, value, icon: Icon, color = 'purple', subtitle, style = {} }) => {
  return (
    <div className="kpi-card" style={style}>
      <div className={`kpi-icon ${color}`}>
        <Icon size={18} />
      </div>
      <span className="kpi-label">{title}</span>
      <span className="kpi-value">{value}</span>
      {subtitle && <span className="kpi-change">{subtitle}</span>}
    </div>
  );
};

export default KpiCard;
