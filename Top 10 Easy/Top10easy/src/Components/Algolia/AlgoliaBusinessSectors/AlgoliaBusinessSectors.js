import { useEffect, useRef, useState } from 'react';
import { Configure, InstantSearch, ToggleRefinement } from 'react-instantsearch-dom';
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentBussinessCategory, globalSearchFocusState, localeState } from "../../../context/appState";
import locales from "../../../locales/locales";
import CustomAutocomplete from '../Autocomplete/Autocomplete';
import algoliasearch from 'algoliasearch';
import { useLoseFocus } from '../../../hooks/state';

const businessCategories = algoliasearch("CP26C79INL", "31c8c44b6cafedf9325e9c1748b215dc");

const businessCategoryClient = {
    search(requests) {
        let algoliaPromise = businessCategories.search(requests)
        return algoliaPromise
    }
}
export default function AlgoliaBusinessSectors(props) {
    const currentLocale = useRecoilValue(localeState);
    const [localeText, setLocaleText] = useState(locales[currentLocale]?.value);
    const [category, setCategory] = useRecoilState(currentBussinessCategory);
    const [searchText, setSearchText] = useState(locales[currentLocale]?.utils?.search);
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [qryTerm, setQryTerm] = useState('');
    const [placeholder, setPlaceholder] = useState(locales[currentLocale]?.utils?.placeholder)
    const navigate = useNavigate();
    const elmRef = useRef(null);
    const [hasFocus, setHasFocus] = useRecoilState(globalSearchFocusState)
    const [cityChangedFirst, setCityChangedFirst] = useState()

    useEffect(() => {
        if (props?.optionSelected) {
            setHasFocus(true)
        } else { setHasFocus(false) }
    }, [props?.optionSelected])

    useLoseFocus(elmRef)

    useEffect(() => {
        setLocaleText(locales[currentLocale]?.value)
    }, [currentLocale])
    useEffect(() => {
        (qryTerm?.trim().length > 1) ? setShowSuggestions(true) : setShowSuggestions(false)

    }, [qryTerm])

    useEffect(() => {
        if (props.cityChanged && !cityChangedFirst) {
            handleFocus();
        }
        setCityChangedFirst(false);
    }, [props.cityChanged])

    const handleQueryChange = (event) => {
        props.onchange(event.target.value);

    }
    const qryChange = (qry) => {
        setQryTerm(qry)
    }
    const dropSelect = (hit) => {
        setCategory(`${hit.title}`)
        navigate(`/search?q=${hit.title}`)
        setHasFocus(false)
    }
    const handleSearch = (qry) => {
    }
    const handleFocus = () => {
        setHasFocus(true)
    }

    return (<div className="w-full mt-4"><InstantSearch searchClient={businessCategoryClient} indexName="BusinessSectorPage">
        <Configure
            hitsPerPage={25}
            analytics={true}
            enablePersonalization={false}
            distinct
            clickAnalytics={true}
        />
        <CustomAutocomplete elmRef={elmRef} hasFocus={hasFocus} handleFocus={handleFocus} placeholder={placeholder}
            btnText={searchText?.button}
            showSuggestions={showSuggestions} handleSearch={handleSearch} qryChange={qryChange}
            dropSelect={dropSelect} />
        <div className="hidden">
            <ToggleRefinement attribute="_locale" label={localeText} value={localeText} defaultRefinement={localeText} />
        </div>
    </InstantSearch></div>)

}
