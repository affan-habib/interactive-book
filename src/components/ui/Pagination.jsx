import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/Icon";

const Pagination = ({
  totalPages,
  currentPage,
  handlePageChange,
  text,
  isReactTable = false,
  className = "custom-class",
}) => {
  const [pages, setPages] = useState([]);
  const [canPreviousPage, setcanPreviousPage] = useState(false);
  const [canNextPage, setcanNextPage] = useState(false);

  const siblingsCount = 1;

  useEffect(() => {
    let pages = [];
    if (isReactTable) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
      if (currentPage > 0) {
        setcanPreviousPage(true);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    setPages(pages);
  }, [totalPages]);

  useEffect(() => {
    if (isReactTable) {
      if (currentPage > 0) {
        setcanPreviousPage(true);
      } else {
        setcanPreviousPage(false);
      }
      if (currentPage < totalPages - 1) {
        setcanNextPage(true);
      } else {
        setcanNextPage(false);
      }
    } else {
      if (currentPage > 1) {
        setcanPreviousPage(true);
      } else {
        setcanPreviousPage(false);
      }
      if (currentPage < totalPages) {
        setcanNextPage(true);
      } else {
        setcanNextPage(false);
      }
    }
  }, [currentPage]);

  const renderPageNumbers = pages.map((number) => {
    if (
      number >= currentPage - siblingsCount &&
      number <= currentPage + siblingsCount
    ) {
      return (
        <li key={number}>
          <button
            className={`${number === currentPage ? "active" : ""} page-link`}
            onClick={() => handlePageChange(number)}
            disabled={number === currentPage}>
            {number}
          </button>
        </li>
      );
    }
    return null;
  });

  const renderReactTablePageNumbers = pages.map((number) => {
    if (
      number >= currentPage - siblingsCount &&
      number <= currentPage + siblingsCount
    ) {
      return (
        <li key={number}>
          <button
            className={`${number === currentPage ? "active" : ""} page-link`}
            onClick={() => handlePageChange(number)}
            disabled={number === currentPage}>
            {number + 1}
          </button>
        </li>
      );
    }
    return null;
  });

  return (
    <div className={className}>
      <ul className="pagination">
        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            className={` ${
              !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={
              isReactTable
                ? () => handlePageChange(0)
                : () => handlePageChange(1)
            }
            disabled={!canPreviousPage}>
            <Icon icon="heroicons:chevron-double-left-solid" />
          </button>
        </li>
        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            className={` ${
              !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canPreviousPage}>
            Prev
          </button>
        </li>

        {isReactTable ? renderReactTablePageNumbers : renderPageNumbers}
        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            className={` ${
              !canNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canNextPage}>
            Next
          </button>
        </li>
        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            onClick={
              isReactTable
                ? () => handlePageChange(totalPages - 1)
                : () => handlePageChange(totalPages)
            }
            disabled={!canNextPage}
            className={` ${
              !canNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            <Icon icon="heroicons:chevron-double-right-solid" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
