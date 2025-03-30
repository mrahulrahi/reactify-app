import './Facet.css';
import { useEffect, useState } from 'react';
import { RefinementList } from 'react-instantsearch-dom';
import { AlgoliaFacet } from '../AlgoliaFacet/AlgoliaFacet';
export default function Facet({ props, searchResults }) {
    const hasResults = searchResults && searchResults.nbHits !== 0;
    const nbHits = searchResults && searchResults.nbHits;
    const [attribute, setAttribute] = useState('')
    const [canSearch, setCanSearch] = useState(false);
    useEffect(() => {
        setAttribute(props?.field);
        setCanSearch(props?.searchable)
    }, [])

    const selectAttr = (e) => {
        console.log(e)
    }
    return (hasResults) ? <div className="refinement-container facet-container shadow-xl mb-4 ml-4 p-8">
        {(canSearch) ? <AlgoliaFacet attribute={attribute} searchable />
            : <AlgoliaFacet attribute={attribute} />}

    </div>
        :
        <div></div>
}