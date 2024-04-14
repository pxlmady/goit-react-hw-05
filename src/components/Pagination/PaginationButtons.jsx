import React from "react";
import css from "./PaginationButtons.module.css";

const PaginationButtons = ({ pageNumber, totalPages, onPageChange }) => {
  const handleClick = (number) => {
    onPageChange(number);
  };
  return (
    <div className={css.paginationButtonsContainer}>
      <button
        className={css.paginationButtons}
        type="button"
        onClick={() => handleClick(1)}>
        First Page
      </button>
      {pageNumber > 1 && (
        <button
          className={css.paginationButtons}
          type="button"
          onClick={() => handleClick(2)}>
          Previous
        </button>
      )}
      {pageNumber < totalPages && (
        <button
          className={css.paginationButtons}
          type="button"
          onClick={() => handleClick(3)}>
          Next
        </button>
      )}
      <button
        className={css.paginationButtons}
        type="button"
        onClick={() => handleClick(4)}>
        Last Page
      </button>
    </div>
  );
};

export default PaginationButtons;
