import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Package, ShoppingBag, Clock, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentOrders from './RecentOrders';
import LowStockAlert from './LowStockAlert';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, pending: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, oRes] = await Promise.all([
          axiosClient.get('/products'),
          axiosClient.get('/orders')
        ]);

        const revenue = oRes.data.reduce((sum, order) => sum + order.total, 0);
        const pending = oRes.data.filter(o => o.status === 'Pending').length;

        setStats({
          products: pRes.data.length,
          orders: oRes.data.length,
          pending,
          revenue
        });
        setRecentOrders(oRes.data.slice(-5).reverse());
        setLowStock(pRes.data.filter(p => p.stock < 10));
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <StatsCard title="Total Products" value={stats.products} icon={Package} color="#3498db" />
        <StatsCard title="Total Orders" value={stats.orders} icon={ShoppingBag} color="#2ecc71" />
        <StatsCard title="Pending Orders" value={stats.pending} icon={Clock} color="#f39c12" />
        <StatsCard title="Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={DollarSign} color="#9b59b6" />
      </div>

      <div className={styles.sections}>
        <RecentOrders orders={recentOrders} />
        <LowStockAlert products={lowStock} />
      </div>
    </div>
  );
};

export default Dashboard;