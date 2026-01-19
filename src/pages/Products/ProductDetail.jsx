import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import styles from "./Products.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Confirm delete this product?")) {
      await axiosClient.delete(`/products/${id}`);
      alert("Deleted successfully!");
      navigate("/products");
    }
  };

  if (loading) return <div className={styles.spinner}>Loading...</div>;

  if (!product)
    return (
      <div className={styles.errorContainer}>
        <h3>Product not found!</h3>
        <button onClick={() => navigate("/products")}>Back to List</button>
      </div>
    );

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.detailHeader}>
        {/* Thêm class backBtn */}
        <button
          className={styles.backBtn}
          onClick={() => navigate("/products")}
        >
          &larr; Back to List
        </button>
        <div className={styles.detailActions}>
          {/* Thêm class editBtn */}
          <button
            className={styles.editBtn}
            onClick={() => navigate(`/products/${id}/edit`)}
          >
            Edit Product
          </button>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles.detailContent}>
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.largeImg}
          />
        </div>

        <div className={styles.info}>
          <span
            className={
              product.status === "Active"
                ? styles.badgeActive
                : styles.badgeInactive
            }
          >
            {product.status}
          </span>
          <h1>{product.name}</h1>
          <p className={styles.desc}>{product.description}</p>

          <div className={styles.gridInfo}>
            <div className={styles.infoItem}>
              <span>Price</span>
              <strong>${Number(product.price).toFixed(2)}</strong>
            </div>
            <div className={styles.infoItem}>
              <span>Stock Quantity</span>
              <strong
                className={
                  product.stock < 10 ? styles.stockRed : styles.stockGreen
                }
              >
                {product.stock} units
              </strong>
            </div>
            <div className={styles.infoItem}>
              <span>Category</span>
              <strong>Electronics</strong> {/* Ví dụ */}
            </div>
            <div className={styles.infoItem}>
              <span>Created Date</span>
              <strong>
                {new Date(product.createdAt).toLocaleDateString()}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
