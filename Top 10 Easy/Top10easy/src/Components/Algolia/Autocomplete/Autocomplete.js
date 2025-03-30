import { useEffect } from 'react';
import { connectAutoComplete } from 'react-instantsearch-dom';
import { useRecoilValue } from 'recoil';
import aa from 'search-insights';
import { userLoginState } from '../../../context/appState';
import { useNavigate } from 'react-router-dom';


const Autocomplete = ({ elmRef, hasFocus, qryChange, dropSelect, handleSearch, handleFocus, hits, currentRefinement, refine, btnText, placeholder }) => {
  const userAuth = useRecoilValue(userLoginState);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(hits)
  }, [hits]);

  return (
    <div className="w-full flex flex-wrap gap-4" ref={elmRef}>
      <div className="relative h-full text-gray-600 grow">
        <input className="w-full py-3 px-5 border-2 bg-white rounded-lg text-sm focus:outline-none"
          type="search" name="search" onFocus={() => handleFocus()} onChange={(e) => { qryChange(e.currentTarget.value); refine(e.currentTarget.value) }} placeholder={placeholder ? placeholder : 'Search here ....'} />

        {(hasFocus ?? false) ?
          <div className="mt-1 list-drop-evr-main block z-50 absolute w-full max-w-80 rounded-lg shadow-md bg-white">
            {hits.map(hit => (
              <div className="block p-3 cursor-pointer truncate w-full hover:bg-green-100 text-left"
                onClick={(e) => {
                  aa('clickedObjectIDsAfterSearch', {
                    userToken: userAuth.email.split('@')[0],
                    eventName: 'Business Clicked',
                    index: 'BusinessesPage',
                    queryID: hit.__queryID,
                    objectIDs: [hit.objectID],
                    positions: [hit.__position],
                  })
                    ; dropSelect(hit)
                }} >
                <span onFocus={() => handleFocus()} key={hit.objectID + "title"} className="text-gray-700 block px-2 text-base font-medium dark:text-gray-400 w-full" role="menuitem" tabIndex="-1">{hit.title}</span>
              </div>
            ))}
          </div>
          :
          null
        }
      </div>

      <button onClick={() => navigate("/search-results")} className="w-full md:w-[calc(25%-12px)] min-w-24 shrink-0 bg-green-500 hover:bg-green-700 text-white font-bold leading-none py-3 px-4 flex items-center justify-center gap-2 capitalize border-2 border-green-500 hover:border-green-700 rounded-lg transition-all" name="submit"
        // onClick={(e) => handleSearch(e)}
        onFocus={() => handleFocus()}>
        <i className="text-white">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" xmlSpace="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </i>
        {btnText}
      </button>
    </div>
  )
};

const CustomAutocomplete = connectAutoComplete(Autocomplete);

export default CustomAutocomplete;
