import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 4 }) => {
  if (type === 'kpi-row') {
    return (
      <div className="grid grid-cols-4 gap-5 mb-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return <div className="skeleton skeleton-chart" />;
  }

  if (type === 'chart-row') {
    return (
      <div className="grid grid-cols-3 gap-5 mb-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton skeleton-chart" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-5 mb-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton skeleton-card" />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
