import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // Hide pagination if there is only one page
  }

  const maxVisiblePages = 3; // Maximum number of visible pages in pagination
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = [];
  if (startPage > 1) {
    pageNumbers.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
          currentPage === 1 ? 'bg-indigo-600 text-white' : 'text-gray-900'
        } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
      >
        {1}
      </button>
    );
    if (startPage > 2) {
      pageNumbers.push(
        <span key="startEllipsis" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900">
          ...
        </span>
      );
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
          currentPage === i ? 'bg-indigo-600 text-white' : 'text-gray-900'
        } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="endEllipsis" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900">
          ...
        </span>
      );
    }
    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
          currentPage === totalPages ? 'bg-indigo-600 text-white' : 'text-gray-900'
        } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
      >
        {totalPages}
      </button>
    );
  }
return (
    <nav className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex-1 flex justify-center">
        <div className="flex space-x-4">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }`}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Page numbers */}
          {pageNumbers}

          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }`}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
