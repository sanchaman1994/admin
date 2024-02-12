import React from 'react'
import "./pagination.css";

const Pagination = ({ setCurrentPage, pages, currentPage, deleteMultiple }) => {

  const goBack = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToFirst = () => {
    setCurrentPage(1);
  };

  const goToLast = () => {
    setCurrentPage(pages);
  };

  const goNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const showPageButtons = () => {
    const buttons = [];
    for (let page = 1; page <= pages; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => goToPage(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };
  return (
    <div className='pagination'>
      <button className='AllDeleteBtn' onClick={deleteMultiple}>Delete Selected</button>
      <div className="button-group">
        <button onClick={goToFirst} disabled={currentPage === 1}>
          {"<<"}
        </button>
        <button onClick={goBack} disabled={currentPage === 1}>
          {"<"}
        </button>
        {showPageButtons()}
        <button onClick={goNext} disabled={currentPage === pages}>
          {">"}
        </button>
        <button onClick={goToLast} disabled={currentPage === pages}>
          {">>"}
        </button>
      </div>
    </div>
  )
}

export default Pagination;