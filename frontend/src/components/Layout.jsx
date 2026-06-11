import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

const Layout = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="app-layout">
      <TopNav
        theme={theme}
        toggleTheme={toggleTheme}
        lastUpdated={new Date().toLocaleTimeString()}
      />
      <div className="page-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
