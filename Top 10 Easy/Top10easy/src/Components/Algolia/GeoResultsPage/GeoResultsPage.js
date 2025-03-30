import './GeoResultsPage.css';
import { useEffect, useState } from "react";
import { currentBussinessCategory, localeState, searchLocationState } from "../../../context/appState";
import { useRecoilValue } from "recoil";
import { ToggleRefinement } from 'react-instantsearch-dom';
import { GoogleMapsLoader, GeoSearch, Control, Marker } from 'react-instantsearch-dom-maps';
import locales from '../../../locales/locales';

export default function GeoResultsPage({ props, searchResults }) {
  const currentLocale = useRecoilValue(localeState);
  const [localeText, setLocaleText] = useState(locales[currentLocale]?.value);
  const selectedLocation = useRecoilValue(searchLocationState);
  const category = useRecoilValue(currentBussinessCategory);
  const ggApiKey = 'AIzaSyByidHzTxTnoSYBmbISOchbRHanQhlMRmM';
  const center = useState({ lat: 59.95, lng: 30.33 })
  const zoom = useState(11)

  useEffect(() => {
    setLocaleText(locales[currentLocale]?.value)
  }, [currentLocale])

  return (<div className='w-full md:w-3/4 p-4'>
    <GoogleMapsLoader apiKey={ggApiKey}>
      {(google) => (
        <GeoSearch google={google} initialZoom={8} >
          {({ hits }) => (
            <>
              <Control />
              {hits.map((hit) => (
                <Marker key={hit.objectID} hit={hit} />
              ))}
            </>
          )}
        </GeoSearch>
      )}
    </GoogleMapsLoader>
    <div className="hidden h-0">
      <ToggleRefinement attribute="_locale" label={localeText} value={localeText} defaultRefinement={localeText} />
      {/* <ToggleRefinement attribute="_city" label={selectedLocation?.city} value={selectedLocation?.city} defaultRefinement={selectedLocation?.city} /> */}
      {/* <ToggleRefinement attribute="_city_state" label={selectedLocation?.state} value={selectedLocation?.state} defaultRefinement={selectedLocation?.state} /> */}
      {/* <ToggleRefinement attribute="_category" label={category} value={category} defaultRefinement={category} /> */}
    </div>
  </div>)
}
