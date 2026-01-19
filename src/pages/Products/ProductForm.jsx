import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import styles from './Products.module.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '', description: '', price: '', stock: '', image: '', status: 'Active'
  });

  useEffect(() => {
    if (isEdit) {
      axiosClient.get(`/products/${id}`).then(res => setForm(res.data));
    }
  }, [id, isEdit]);

  const validate = () => {
    if (form.name.length > 100) return "Name max 100 characters";
    if (form.description.length > 500) return "Description max 500 characters";
    if (form.price < 0.01) return "Price min $0.01";
    if (form.stock < 0 || !Number.isInteger(Number(form.stock))) return "Stock must be a positive integer";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      let res;
      if (isEdit) {
        res = await axiosClient.put(`/products/${id}`, payload);
      } else {
        payload.createdAt = new Date().toISOString();
        res = await axiosClient.post('/products', payload);
      }
      alert(isEdit ? "Updated!" : "Created!");
      navigate(`/products/${res.data.id}`);
    } catch (err) {
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h2>{isEdit ? 'Edit Product' : 'New Product'}</h2>
      <form onSubmit={handleSubmit} className={styles.mainForm}>
        <div className={styles.field}>
          <label>Name (Max 100)</label>
          <input required maxLength="100" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className={styles.field}>
          <label>Description (Max 500)</label>
          <textarea required maxLength="500" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <div className={styles.field}>
          <label>Price</label>
          <input type="number" step="0.01" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
        </div>
        <div className={styles.field}>
          <label>Stock</label>
          <input type="number" required value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
        </div>
        <div className={styles.field}>
          <label>Image URL</label>
          <input required value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
        </div>
        <div className={styles.field}>
          <label>Status</label>
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className={styles.formBtns}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? 'Saving...' : 'Submit'}</button>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate('/products')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;