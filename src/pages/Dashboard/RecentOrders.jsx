import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const RecentOrders = ({ orders }) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>Recent Orders</h3>
        <Link to="/orders" className={styles.viewAll}>View All →</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>{o.customerName}</td>
              <td>${o.total.toLocaleString()}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[o.status.toLowerCase()]}`}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan="4">No orders found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;