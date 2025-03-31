import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';

const CustomPagination = ({ currentRefinement, nbPages, refine, createURL }) => {
  const pages = Array.from({ length: nbPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center space-x-2 my-4 flex-wrap">
      {pages?.length > 0 &&
        <>
          {/* Previous Button */}
          <button
            onClick={() => refine(currentRefinement - 1)}
            disabled={currentRefinement === 1}
            className={`px-3 py-1 border rounded transition-colors duration-300 ease-in-out ${currentRefinement === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-400 text-white hover:bg-gray-500'}`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {pages?.map(page => (
            <a
              key={page}
              href={createURL(page)}
              onClick={event => {
                event.preventDefault();
                refine(page);
              }}
              className={`flex py-2 px-4 my-1 rounded bg-gray-200 text-dark items-center ${currentRefinement === page ? 'bg-green-400 text-white' : 'hover:bg-green-500 hover:text-white'}`}
            >
              {/* flex w-full  font-bold py-2 px-4 rounded text-white items-center */}
              {page}
            </a>
          ))}

          {/* Next Button */}
          <button
            onClick={() => refine(currentRefinement + 1)}
            disabled={currentRefinement === nbPages}
            className={`px-3 py-1 border rounded transition-colors duration-300 ease-in-out ${currentRefinement === nbPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-400 text-white hover:bg-gray-500'}`}
          >
            Next
          </button>
        </>
      }
    </div>
  );
};

const ConnectedCustomPagination = connectPagination(CustomPagination);

export default ConnectedCustomPagination;
