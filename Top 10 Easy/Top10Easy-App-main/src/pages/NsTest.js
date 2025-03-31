import React, { useEffect, useState } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  connectStateResults
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import ConnectedCustomRefinementList from './CustomRefinementList';
import ConnectedCustomPagination from './CustomPagination';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import Hit from './Hit';
import Loading from '../Components/Loading/Loading';
import NoResultsFound from '../Components/Algolia/NoResultsFound/NoResultsFound';
import GeoResultsPage from '../Components/Algolia/GeoResultsPage/GeoResultsPage';
import { Config } from '../lib/api';

// const searchClient = algoliasearch("CP26C79INL", "31c8c44b6cafedf9325e9c1748b215dc");

// const indexName = 'BusinessesPage';


const searchClient = algoliasearch(Config.APPLICATION_ID, Config.API_KEY);

const indexName = Config.INDEX_PREFIX;

const Results = connectStateResults(({ searchResults, children }) => {
  if (!searchResults || searchResults.nbHits === 0) {
    return <NoResultsFound />;
  }
  return children;
});

export default function NsTest() {
  const [filters, setFilters] = useState({});

  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  function correctString(input) {
    return input
      .replace(/^_/, '') // Remove leading underscore if present
      .split('_') // Split by underscores
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join words with spaces
  }

  // Fetch facets for filters from Algolia on component mount
  useEffect(() => {
    const fetchFacets = async () => {
      setLoading(true);
      const index = searchClient.initIndex(Config.INDEX_PREFIX);
      try {
        const result = await index.search('', {
          facets: ['*'],
        });
        setFilters(result.facets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching facets:', error);
      }
    };

    fetchFacets();
  }, []);

  useEffect(() => {
    const instaSearchBox = document.querySelector('.ais-SearchBox')
    const instaSearchForm = document.querySelector('.ais-SearchBox-form')
    const instaSearch = document.querySelector('.ais-SearchBox-input')
    const instaSearchBtn = document.querySelector('.ais-SearchBox-submit')
    const instaCancelSearch = document.querySelector('form > button.ais-SearchBox-reset')
    instaSearchBox.classList.add('w-full')
    instaSearchForm.classList.add('flex', 'w-full')
    instaCancelSearch.classList.add("hidden")
    instaSearchBtn.classList.add("bg-green-400", "h-10", "px-5", "pr-6", "rounded-r-lg", "border-1", "border-gray-300")
    instaSearch.classList.add("searchbox", "p-0", "border-1", "border-gray-300", "bg-white", "h-10", "px-5", "rounded-l-lg",
      "text-sm", "focus:outline-none", "w-full", "px-0")
  }, []);


  // Define the search state mapping functions for syncing with the URL
  const createURL = state => `?${qs.stringify(state)}`;

  const searchStateToUrl = ({ location }, searchState) =>
    searchState ? `${location.pathname}${createURL(searchState)}` : '';

  const urlToSearchState = location => qs.parse(location.search.slice(1));

  const [searchState, setSearchState] = useState(urlToSearchState(location));

  useEffect(() => {
    setSearchState(urlToSearchState(location));
  }, [location]);

  const onSearchStateChange = updatedSearchState => {
    setSearchState(updatedSearchState);
    const url = searchStateToUrl({ location }, updatedSearchState);
    navigate(url); // Use navigate instead of history.push
  };

  const handleClearFilters = () => {
    // Reset filters to their initial state
    // Clear the URL query parameters by navigating to the base route
    navigate('/search-results');
  };

  const [isResult, setIsResult] = useState(true);

  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        <section className="w-full text-gray-700 bg-gray-100">
          <div className="container flex flex-col flex-wrap items-center justify-between py-5 px-4 mx-auto md:flex-row max-w-7xl">
            <div className="relative flex flex-col md:flex-row items-center w-full justify-between">
              <div className="hidden md:flex items-center space-x-6 lg:justify-end cursor-pointer">
                <Link to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
              </div>

              <div className="flex w-full md:w-3/4 items-center justify-between md:ps-12">
                <div className="flex w-10/12 max-w-xs">
                  <SearchBox />
                </div>

                {/* <div className="inline-flex items-center ml-4 sm:ml-5 space-x-6 lg:justify-end">
                  <button className={`${isResult && `bg-gray-200 p-4 rounded`}`} data-view="list"
                    onClick={() => setIsResult(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" data-view="list" className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                  <button className={`${!isResult && `bg-gray-200 p-4 rounded`}`} data-view="map"
                    onClick={() => setIsResult(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" data-view="map" className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        <div className="container w-full px-4 py-9 mx-auto md:flex-row max-w-7xl">
          <Configure hitsPerPage={7} />
          <div className="flex flex-col md:flex-row">
            <aside className="w-full md:w-1/4">
              <button
                className="custom-clear-btn mb-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all ease-in-out duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
              {loading ? <Loading /> :
                <>
                  {Object.keys(filters).map((filterKey, index) => {
                    return (
                      <div key={index} className="refinement-container facet-container shadow-xl mb-4 p-4">
                        <p className="text-md font-semibold mb-2">
                          {correctString(filterKey)}
                        </p>
                        <ConnectedCustomRefinementList attribute={filterKey} />
                      </div>
                    )
                  }
                  )}
                </>}
            </aside>
            {isResult ?
              <main className="w-full md:w-3/4 md:ps-8 lg:ps-12 mt-8 lg:mt-4">
                {loading ? <Loading /> :
                  <Results>
                    <Hits hitComponent={Hit} />
                  </Results>
                }
                <div className="mt-4">
                  <ConnectedCustomPagination />
                </div>
              </main>
              : <GeoResultsPage />
            }
          </div>
        </div>
      </InstantSearch>
    </>
  );
}