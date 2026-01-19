import React from 'react';
import styles from './Layout.module.css';

const Header = ({ user, onLogout, toggleSidebar }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          ☰
        </button>
        <span className={styles.welcome}>Welcome, <strong>{user?.name}</strong></span>
      </div>
      <button onClick={onLogout} className={styles.logoutBtn}>Logout</button>
    </header>
  );
};

export default Header;