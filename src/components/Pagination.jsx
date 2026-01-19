import React from 'react';
import styles from '../pages/Products/Products.module.css';

const Pagination = ({ total, limit, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 0) return null;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationContainer}>
      <span className={styles.paginationInfo}>
        Showing {start}-{end} of {total} items
      </span>
      <div className={styles.paginationButtons}>
        <button 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        
        {pages.map(page => (
          <button 
            key={page}
            className={currentPage === page ? styles.activePage : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;