import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import Pagination from "../../components/Pagination";
import styles from "./Products.module.css";

const ProductList = () => {
  const navigate = useNavigate();
  const { loading, getProducts, deleteProduct } = useProducts();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  // LOGIC TÌM KIẾM DEBOUNCE (TRỄ 1 GIÂY)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); 
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const fetchItems = async () => {
    const params = {
      _page: page,
      _limit: 10,
      ...(search && { q: search }),
      ...(status !== "All" && { status }),
    };

    const result = await getProducts(params);

    // Lọc thêm tại client để đảm bảo chính xác tuyệt đối
    let filteredData = result.data;
    if (search) {
      filteredData = filteredData.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setProducts(filteredData);
    setTotal(result.total);
  };

  useEffect(() => {
    fetchItems();
  }, [page, search, status]);

  const handleClear = () => {
    setSearchInput("");
    setSearch("");
    setStatus("All");
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(id);
      if (success) {
        alert("Product deleted successfully!");
        fetchItems();
      }
    }
  };

  const getStockClass = (stock) => {
    if (stock > 50) return styles.stockGreen;
    if (stock >= 10) return styles.stockOrange;
    return styles.stockRed;
  };

  return (
    <div className={styles.productList}>
      <div className={styles.listHeader}>
        <h2>Products</h2>
        <Link to="/products/new" className={styles.addBtn}>
          + New Product
        </Link>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <input
            value={searchInput}
            placeholder="Type to search ..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput !== search && (
            <span className={styles.searchingText}>Searching...</span>
          )}
        </div>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button className={styles.clearBtn} onClick={handleClear}>
          Clear Filters
        </button>
      </div>

      {loading ? (
        <div className={styles.spinner}>Loading data...</div>
      ) : products.length === 0 ? (
        <div className={styles.empty}>No products found for "{search}"</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className={styles.actionHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} width="40" height="40" alt="" />
                </td>
                <td>
                  <Link to={`/products/${p.id}`} className={styles.productLink}>
                    {p.name}
                  </Link>
                </td>
                <td>${Number(p.price).toFixed(2)}</td>
                <td className={getStockClass(p.stock)}>{p.stock}</td>
                <td>
                  <span className={p.status === "Active" ? styles.badgeActive : styles.badgeInactive}>
                    {p.status}
                  </span>
                </td>
                <td className={styles.actionCell}> {/* Thêm class này */}
                  <div className={styles.actions}>
                    <button onClick={() => navigate(`/products/${p.id}`)}>View</button>
                    <button onClick={() => navigate(`/products/${p.id}/edit`)}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination total={total} limit={10} currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default ProductList;