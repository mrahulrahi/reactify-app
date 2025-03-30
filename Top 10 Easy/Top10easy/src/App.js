import './App.css';
import { Route, Routes } from "react-router-dom";
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import Navigation from './Components/Layout/Navigation/Navigation';
import Footer from './Components/Layout/Footer/Footer';
import Home from './Components/Pages/Home/Home';
import About from './Components/Pages/About/About';
import EzSearch from './Components/Pages/EzSearch/EzSearch';
import Contact from './Components/Pages/Contact/Contact';
import Business from './Components/Pages/Business/Business';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Privacy from './Components/Pages/Privacy/Privacy';
import splitbee from '@splitbee/web';
import { useBusiness, useScrollTop } from './hooks/state';
import VideoModal from './Components/Utils/VideoModal/VideoModal';
import AlgoliaInsights from './Components/Algolia/AlgoliaInsights/AlgoliaInsights';
import { useRecoilValue } from 'recoil';
import { currentBussinessCategory, localeState, searchLocationState, userLoginState } from './context/appState';
import NsTest from './pages/NsTest';
import Terms from './Components/Pages/Terms/Terms';
import Careers from './Components/Pages/Careers/Careers';
import Providers from './utils/Provider';

const searchClient = algoliasearch("CP26C79INL", "31c8c44b6cafedf9325e9c1748b215dc");

function App() {
  const userAuth = useRecoilValue(userLoginState);
  const category = useRecoilValue(currentBussinessCategory);
  const locale = useRecoilValue(localeState);
  const location = useRecoilValue(searchLocationState);
  const pageLocation = useLocation();
  const [cityImage, setImage] = useState("https://imgs.search.brave.com/1uPRuEUMN-y1Ww06gL6B0E2cU6foFSxQvIkqmIxNQKc/rs:fit:1158:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5u/ck9nSnF1dUJTT2Ry/Tjl6dU1iZU93SGFE/QyZwaWQ9QXBp");
  //const category = useRecoilValue(currentBussinessCategory);
  const stateLocation = useRecoilValue(searchLocationState);

  useBusiness()
  useScrollTop()
  useEffect(() => {
    splitbee.init()
  }, [])

  return (
    <div className="App">
      <Providers>
        <InstantSearch searchClient={searchClient} indexName="BusinessesPage">
          <Configure
            hitsPerPage={10}
            analytics={true}
            analyticsTags={[`user:${userAuth.email}`, `category:${category}`,
            `country:${location.country}`, `state:${location.state}`,
            `city:${location.city}`, `locale:${locale}`]}
            enablePersonalization={false}
            distinct
            clickAnalytics
          />
          <header className="App-header">
            <Navigation></Navigation>
          </header>
          <div className="main">
            {/* <div style={{backgroundImage: `url("https://top10ezdevbucket221148-dev.s3.amazonaws.com/images/BBA476.max-800x600.jpg")`, backgroundRepeat: 'no-repeat',backgroundPosition: 'center center', backgroundSize: 'cover',  height: '45vh'}} className="city-image-banner bg-gray-400 w-full  bg-no-repeat bg-cover">
      </div> */}
            {pageLocation.pathname === '/' ? <div style={{ backgroundImage: `url("${stateLocation?.cityImgUrl ?? 'https://top10ezdevbucket221148-dev.s3.amazonaws.com/images/BBA476.max-800x600.jpg'}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover', height: '45vh' }} className="city-image-banner bg-gray-400 w-full h-72 bg-no-repeat bg-cover">
            </div> : null}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/terms-and-condition" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/search" element={<EzSearch />} />
              <Route path="/search-results" element={<NsTest />} />
              <Route path="/business/:name" element={<Business />} />
            </Routes>
          </div>
        </InstantSearch>
        <VideoModal />
        <AlgoliaInsights searchClient={searchClient} />
        <footer className="bottom-0 w-full">
          <Footer></Footer>
        </footer>
      </Providers>
    </div>
  );
}

export default App;
