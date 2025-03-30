import EzInstallPrompt from "../../Layout/EzInstallPrompt/EzInstallPrompt";
import HeadlessUiDropdown from "../../Utils/HeadlessUiDropdown/HeadlessUiDropdown";
import locales from "../../../locales/locales";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { localeState } from "../../../context/appState";
import algoliasearch from 'algoliasearch/lite';
import "./Home.css";
import { useNavigate } from "react-router-dom";
import qs from 'qs';

const searchClient = algoliasearch("CP26C79INL", "31c8c44b6cafedf9325e9c1748b215dc");

export default function Home() {

    const navigate = useNavigate();

    const currentLocale = useRecoilValue(localeState);

    const [homeText, setHomeText] = useState(locales[currentLocale]?.home);

    useEffect(() => {
        setHomeText(locales[currentLocale]?.home);
    }, [currentLocale]);

    const [countries, setCountries] = useState([]);
    const [states, setState] = useState([]);
    const [cities, setCity] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [searchValue, setSearchValue] = useState('');

    // Fetch facets for filters from Algolia on component mount
    useEffect(() => {
        fetchFacets();
    }, []);

    const fetchFacets = async () => {
        const index = searchClient.initIndex('BusinessesPage');
        try {
            const result = await index.search('', {
                facets: ['*'],
            });
            if (result.facets) {
                // Extract and set countries
                const countries = Object.keys(result.facets._country);
                setCountries(countries);

                // Extract and set states
                const states = Object.keys(result.facets._city_state);
                setState(states);

                // Extract and set cities
                const cities = Object.keys(result.facets._city);
                setCity(cities);
            }
        } catch (error) {
            console.error('Error fetching facets:', error);
        }
    };

    // Function to handle submit button click
    const handleSubmit = () => {
        const searchState = {
            refinementList: {
                _country: selectedCountry ? [selectedCountry] : [],
                _city_state: selectedState ? [selectedState] : [],
                _city: selectedCity ? [selectedCity] : []
            },
        };

        // Convert the search state to a query string
        const queryString = qs.stringify(searchState);

        // Navigate to the destination with the query string
        if (searchValue?.length > 0) {
            navigate(`/search-results?query=${searchValue}&${queryString}`);
        } else {
            navigate(`/search-results?${queryString}`);
        }
    };

    return (
        <section className="w-full px-3 antialiased bg-white">
            <EzInstallPrompt />

            <div className="mx-auto max-w-6xl py-16">
                <div className="container mx-auto text-left md:max-w-none md:text-center">
                    <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 text-center sm:leading-none sm:text-5xl md:text-6xl lg:text-7xl">
                        <span>{homeText?.h1Top}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-green-400">
                            {homeText?.h1Bottom}
                        </span>
                    </h1>
                    <div className="w-full flex flex-col items-center mt-8 sm:mt-12 text-center mx-auto">
                        <div className="w-full flex flex-wrap items-center gap-3 md:gap-6">
                            <HeadlessUiDropdown
                                selected={selectedCountry}
                                optionList={countries}
                                setSelected={setSelectedCountry}
                                fieldLabel="Country"
                            />
                            <HeadlessUiDropdown
                                selected={selectedState}
                                optionList={states}
                                setSelected={setSelectedState}
                                fieldLabel="State"
                            />
                            <HeadlessUiDropdown
                                selected={selectedCity}
                                optionList={cities}
                                setSelected={setSelectedCity}
                                fieldLabel="City"
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-wrap gap-6 mt-4">
                        <div className="relative h-full text-gray-600 grow">
                            <input
                                className="w-full py-3 px-5 border-2 bg-white rounded-lg text-sm focus:outline-none"
                                type="search" name="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder={'Search here ....'}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full md:w-[calc(33.33%-16px)] min-w-24 shrink-0 bg-green-500 hover:bg-green-700 text-white font-bold leading-none py-3 px-4 flex items-center justify-center gap-2 capitalize border-2 border-green-500 hover:border-green-700 rounded-lg transition-all"
                            name="submit"
                        >
                            <i className="text-white">
                                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </i>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
