import { useState } from 'react';

export const useMultiPageForm = (pages) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((index) => {
      if (index >= pages.length - 1) return index;
      return index + 1;
    });
  };

  const prevPage = () => {
    setCurrentPage((index) => {
      if (index <= 0) return index;
      return index - 1;
    });
  };

  return {
    currentPage,
    page: pages[currentPage],
    pages,
    isFirstPage: currentPage === 0,
    isLastPage: currentPage === pages.length - 1,
    isSecondLastPage: currentPage === pages.length - 2,
    nextPage,
    prevPage,
  };
};
