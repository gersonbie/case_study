import React from "react";
import ArrowRight2Icon from "../assets/svgs/arrowright2";
import ArrowRightIcon from "../assets/svgs/arrowright";
import ArrowLeftIcon from "../assets/svgs/arrowleft";
import ArrowLeft2Icon from "../assets/svgs/arrowleft2";
import "./style/pagination.css";

const Pagination = ({ currentPage, totalPages, totalItems, changePage }) => {
  const setPage = (id) => {
    if (changePage) changePage(id)
  }
  return (
    <div className="flex w-full justify-between items-center mt-2 mb-4">
      <div className="flex gradient-text font-bold">{totalItems} Linha (as)</div>
      <div className="flex gap-1 pagination">
        <button disabled={currentPage === 0} type="button" onClick={() => setPage(0)}><ArrowLeft2Icon /></button>
        <button disabled={currentPage === 0} type="button" onClick={() => setPage(--currentPage)}><ArrowLeftIcon /></button>
        {currentPage - 1 < 1 ? null : <button type="button" onClick={() => setPage(currentPage - 2)}><span>{currentPage - 1}</span></button>}
        {currentPage < 1 ? null : <button type="button" onClick={() => setPage(--currentPage)}><span>{currentPage}</span></button>}
        <button type="button" onClick={() => setPage(currentPage)} className="current"><span>{currentPage + 1}</span></button>
        {currentPage + 1 > totalPages - 1 ? null : <button type="button" onClick={() => setPage(++currentPage)}><span>{currentPage + 2}</span></button>}
        {currentPage + 2 > totalPages - 1 ? null : <button type="button" onClick={() => setPage(currentPage + 2)}><span>{currentPage + 3}</span></button>}


        <button disabled={currentPage === totalPages - 1} type="button" onClick={() => setPage(++currentPage)}><ArrowRightIcon /></button>
        <button disabled={currentPage === totalPages - 1} type="button" onClick={() => setPage(--totalPages)}><ArrowRight2Icon /></button>
      </div>
    </div>
  );
};
export default Pagination;
