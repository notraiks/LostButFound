import React from 'react';
import './Pagination.css';  

function Pagination({ currentPage, totalPages, totalItems, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span className="pagination-text">
          Showing page {currentPage} of {totalPages} | Total items: {totalItems}
        </span>
      </div>

      <div className="pagination">
        <button
          className="nav-arrow"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8592; Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-button ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}

        <button
          className="nav-arrow"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
