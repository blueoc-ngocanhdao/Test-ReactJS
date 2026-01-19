import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import styles from './Orders.module.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axiosClient.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(() => alert('Order not found'));
  }, [id]);

  const updateStatus = async (newStatus) => {
    if (window.confirm(`Change status to ${newStatus}?`)) {
      try {
        await axiosClient.patch(`/orders/${id}`, { status: newStatus });
        setOrder({ ...order, status: newStatus });
      } catch (err) {
        alert('Update failed');
      }
    }
  };

  if (!order) return <div>Loading order details...</div>;

  return (
    <div className={styles.detailCard}>
      <button onClick={() => navigate('/orders')} className={styles.backBtn}>&larr; Back to List</button>
      <div className={styles.orderHeader}>
        <h3>Order #{order.id}</h3>
        <p>Placed on: {order.date}</p>
      </div>

      <div className={styles.infoSection}>
        <div>
          <h4>Customer Info</h4>
          <p>Name: {order.customerName}</p>
          <p>Email: {order.customerEmail}</p>
        </div>
        <div>
          <h4>Current Status: <span className={styles.statusText}>{order.status}</span></h4>
          <div className={styles.actions}>
            {order.status === 'Pending' && (
              <>
                <button onClick={() => updateStatus('Processing')} className={styles.btnProcess}>Accept</button>
                <button onClick={() => updateStatus('Cancelled')} className={styles.btnCancel}>Cancel</button>
              </>
            )}
            {order.status === 'Processing' && (
              <button onClick={() => updateStatus('Completed')} className={styles.btnComplete}>Mark as Completed</button>
            )}
          </div>
        </div>
      </div>

      <table className={styles.itemTable}>
        <thead>
          <tr><th>Product</th><th>Quantity</th><th>Price</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.summary}>
         <h3>Total: ${order.total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default OrderDetail;