import React from 'react';
import styles from './Dashboard.module.css';
import { AlertTriangle } from 'lucide-react';

const LowStockAlert = ({ products }) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>Low Stock Alert</h3>
      </div>
      <div className={styles.alertList}>
        {products.length > 0 ? (
          products.map(p => (
            <div key={p.id} className={styles.alertItem}>
              <AlertTriangle size={18} color="#e74c3c" />
              <div className={styles.alertText}>
                <span>{p.name}</span>
                <small>Stock: <strong>{p.stock}</strong></small>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyText}>All products are in good stock.</p>
        )}
      </div>
    </div>
  );
};

export default LowStockAlert;