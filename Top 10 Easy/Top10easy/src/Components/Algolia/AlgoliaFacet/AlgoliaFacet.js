// import { useEffect, useState } from 'react'
// import { Highlight, connectRefinementList } from 'react-instantsearch-dom';
// import splitbee from '@splitbee/web';
// import { BsCurrencyDollar } from "react-icons/bs";
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { searchLocationState } from '../../../context/appState';

// const RefinementList = ({ attribute, items, isFromSearch, refine, searchForItems, createURL }) => {
//   const [selectedLocation, setSelectedLocation] = useRecoilState(searchLocationState)

//   const refineList = (e, item) => {
//     setSelectedLocation({ country: "", state: "", city: "" })
//     e?.preventDefault();
//     refine(item.value);
//     if (item.value.length > 0) {
//       splitbee.track(`${attribute}_filter`, {
//         type: item.value
//       })
//     }
//   }

//   const label = (item) => {
//     if (attribute === 'business_price_range') {
//       return <div className="flex flex-row">{generateDollarOptions(Number(item.label))}</div>
//     }
//     return item.label
//   }
//   const generateDollarOptions = (length) => {
//     return [...Array(length).keys()].map(i => {
//       return <BsCurrencyDollar className="text-yellow-400" />
//     });
//   }
//   return (
//     <ul>
//       <li className="capitalize">{`${attribute.replace('_city_', '').replaceAll('_', ' ')}`}</li>

//       {items.map(item => (
//         <li key={item.label}>
//           <a
//             href={createURL(item.value)}
//             style={{ fontWeight: item.isRefined ? 'bold' : '' }}
//             onClick={(e) => refineList(e, item)}
//             className="flex justify-between items-center hover:text-green-400"
//           >
//             {isFromSearch ? (
//               <Highlight attribute="label" hit={item} />
//             ) : (
//               <span>{label(item)}</span>
//             )}{' '}
//             <span>({item.count})</span>
//           </a>
//         </li>
//       ))}
//     </ul>
//   )
// };


// export const AlgoliaFacet = connectRefinementList(RefinementList);

import { useEffect, useState } from 'react';
import { Highlight, connectRefinementList } from 'react-instantsearch-dom';
import splitbee from '@splitbee/web';
import { BsCurrencyDollar } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchLocationState } from '../../../context/appState';

const RefinementList = ({ attribute, items, isFromSearch, refine, searchForItems, createURL }) => {
  const [selectedLocation, setSelectedLocation] = useRecoilState(searchLocationState);

  // Refines the list based on the selected item
  const refineList = (e, item) => {
    // Prevents unnecessary reset if the attribute is not location-related
    if (attribute.includes('city') || attribute.includes('location')) {
      setSelectedLocation({ country: "", state: "", city: "" });
    }

    refine(item.value); // Perform the refinement

    // Track filter usage with Splitbee analytics
    if (item.value.length > 0) {
      splitbee.track(`${attribute}_filter`, {
        type: item.value
      });
    }
  };

  // Handles label formatting for price ranges
  const label = (item) => {
    if (attribute === 'business_price_range') {
      return <div className="flex flex-row">{generateDollarOptions(Number(item.label))}</div>;
    }
    return item.label;
  };

  // Generates dollar symbols for the price range
  const generateDollarOptions = (length) => {
    return [...Array(length).keys()].map(i => {
      return <BsCurrencyDollar className="text-yellow-400" key={i} />;
    });
  };

  return (
    <ul>
      {/* Display the attribute name */}
      <li className="capitalize">{`${attribute.replace('_city_', '').replaceAll('_', ' ')}`}</li>

      {/* Map through the items and render them */}
      {items.map(item => (
        <li key={item.label}>
          <button
            type="button"
            style={{ fontWeight: item.isRefined ? 'bold' : 'normal' }}
            onClick={(e) => refineList(e, item)}
            className="flex justify-between items-center hover:text-green-400"
          >
            {/* Display item label */}
            {isFromSearch ? (
              <Highlight attribute="label" hit={item} />
            ) : (
              <span>{label(item)}</span>
            )}{' '}
            {/* Display item count */}
            <span>({item.count})</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

// Connect the RefinementList to Algolia's InstantSearch
export const AlgoliaFacet = connectRefinementList(RefinementList);
