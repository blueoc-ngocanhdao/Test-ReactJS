import React from 'react';
import styles from './Dashboard.module.css';

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon} style={{ backgroundColor: color }}>
        <Icon size={24} color="#fff" />
      </div>
      <div className={styles.cardInfo}>
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;