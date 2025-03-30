import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';

const CustomRefinementList = ({ items, refine }) => (
  <div>
    {items?.map(item => (
      <div
        key={item.label}
        className="flex items-center justify-between p-2 mb-2 cursor-pointer hover:bg-gray-100"
        onClick={() => refine(item.value)} // Call refine on click
      >
        <span className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.isRefined} // Check if item is refined
            onChange={() => refine(item.value)} // Toggle refinement on change
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          <span className={`text-sm ${item.isRefined ? 'font-semibold text-blue-600' : 'text-gray-800'}`}>
            {item.label} ({item.count}) {/* Display count */}
          </span>
        </span>
      </div>
    ))}
  </div>
);

// Connect the component to Algolia's RefinementList functionality
const ConnectedCustomRefinementList = connectRefinementList(CustomRefinementList);

export default ConnectedCustomRefinementList;
