import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import styles from './Orders.module.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      let url = '/orders';
      if (statusFilter !== 'All') url += `?status=${statusFilter}`;
      try {
        const res = await axiosClient.get(url);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [statusFilter]);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className={styles.orderList}>
      <div className={styles.header}>
        <h2>Orders ({orders.length})</h2>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td><Link to={`/orders/${o.id}`}>{o.id}</Link></td>
              <td>{o.customerName}</td>
              <td>{o.date}</td>
              <td>${o.total.toFixed(2)}</td>
              <td>
                <span className={`${styles.badge} ${styles[o.status.toLowerCase()]}`}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;