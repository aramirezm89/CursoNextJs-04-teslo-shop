export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // if total pages less than 7 show all the pages without ellipsis

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (value, index) => index + 1); //[1,2,3,4,5,6,7]
  }

  // if current page is between the first 3 pages, show the frist 3 pages, ellipsis and the last 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]; // [1,2,3,'...',49,50]
  }

  // if current page is between the last 3 pages, show the first 2, ellipsis, and the last 3 pages

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]; // [1,2,'...',48,49,50]
  }

  // if current page is in the middle, show firt page, ellipsis, current page - 1, current page, current page +1 , ellipsis, totalpages

  return [1, "...", currentPage -1, currentPage, currentPage + 1, '...', totalPages];
};
