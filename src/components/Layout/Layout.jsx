import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import styles from './Layout.module.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.container}>
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className={styles.main}>
        <Header 
          user={user} 
          onLogout={handleLogout} 
          toggleSidebar={toggleSidebar} 
        />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;