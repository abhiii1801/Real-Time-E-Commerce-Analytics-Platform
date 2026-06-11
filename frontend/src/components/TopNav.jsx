import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Radio, Activity, Sun, Moon, Clock } from 'lucide-react';

const tabs = [
  { path: '/', label: 'Analytics', icon: BarChart3 },
  { path: '/live', label: 'Live Orders', icon: Radio },
  { path: '/monitoring', label: 'Monitoring', icon: Activity },
];

const TopNav = ({ theme, toggleTheme, lastUpdated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <div className="nav-brand">
          <div className="nav-brand-icon">EA</div>
          <span className="nav-brand-text">E-Commerce Analytics</span>
        </div>

        <div className="nav-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                className={`nav-tab ${isActive ? 'active' : ''}`}
                onClick={() => navigate(tab.path)}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="nav-actions">
          {lastUpdated && (
            <span className="nav-timestamp">
              <Clock size={12} />
              {lastUpdated}
            </span>
          )}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
