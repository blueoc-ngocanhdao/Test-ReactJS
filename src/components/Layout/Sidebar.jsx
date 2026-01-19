import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react'; 
import styles from './Layout.module.css';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? '' : styles.sidebarClosed}`}>
      <div className={styles.logo}>
        {isOpen ? 'CMS PRO' : 'CP'}
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" className={({isActive}) => isActive ? styles.active : ''}>
          <LayoutDashboard size={20} className={styles.lucideIcon} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>
        
        <NavLink to="/products" className={({isActive}) => isActive ? styles.active : ''}>
          <Package size={20} className={styles.lucideIcon} />
          {isOpen && <span>Products</span>}
        </NavLink>
        
        <NavLink to="/orders" className={({isActive}) => isActive ? styles.active : ''}>
          <ShoppingCart size={20} className={styles.lucideIcon} />
          {isOpen && <span>Orders</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;