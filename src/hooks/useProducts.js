import { useState, useCallback } from 'react';
import axiosClient from '../api/axiosClient';

export const useProducts = () => {
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async (searchParams) => { // Đổi tên để tránh nhầm lẫn
    setLoading(true);
    try {
      // SAI: await axiosClient.get('/products', searchParams);
      // ĐÚNG: Phải bọc trong { params: ... }
      const response = await axiosClient.get('/products', { 
        params: searchParams 
      }); 
      
      return {
        data: response.data,
        total: parseInt(response.headers['x-total-count'] || 0)
      };
    } catch (err) {
      console.error("API Error:", err);
      return { data: [], total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axiosClient.delete(`/products/${id}`);
      return true;
    } catch (err) {
      return false;
    }
  };

  return { loading, getProducts, deleteProduct };
};