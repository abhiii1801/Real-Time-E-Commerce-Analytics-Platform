import React from 'react';

const ChartCard = ({ title, subtitle, rightAction, children, style = {} }) => {
  return (
    <div className="chart-card" style={style}>
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">{title}</div>
          {subtitle && <div className="card-subtitle">{subtitle}</div>}
        </div>
        {rightAction && <div className="chart-card-badge">{rightAction}</div>}
      </div>
      <div className="chart-body">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
