import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { searchHitState, userLoginState } from "../../../context/appState";
import { useRecoilValue } from "recoil";
import { useBusiness } from "../../../hooks/state";
import Stars from "../../Utils/Stars/Stars";
import GoogleMapReact from 'google-map-react';
import MapBusinessMarker from "../../Utils/MapBusinessMarker/MapBusinessMarker";
import aa from 'search-insights';
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import logo from '../../../imgs/LogoTop10.jpg';
import algoliasearch from 'algoliasearch';
import { Config } from "../../../lib/api";
import getThumbFromUrl from "../../../lib/getThumbFromUrl";
import ReactPlayer from "react-player";


// Default workhours
const weekHours = [
    { day: 'Monday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Sunday', hours: '9:00 AM - 10:00 PM' }
]
export default function Business() {

    const days = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday' }

    const [selectedBusiness, setSelectedBusiness] = useState({});
    console.log(selectedBusiness);

    const userAuth = useRecoilValue(userLoginState);

    const hit = useRecoilValue(searchHitState)

    const params = useParams();

    const slug = params?.name;

    const { language } = useSelector((state) => state.language);

    useBusiness()

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const client = algoliasearch(Config.APPLICATION_ID, Config.SEARCH_ONLY_API_KEY);

    const index = client.initIndex(Config.INDEX_PREFIX);

    useEffect(() => {

        // Fetch data from the API
        const fetchData = async () => {

            setLoading(true);

            const { hits } = await index.search('');

            const foundObject = hits.find(item => item.slug === slug);

            setSelectedBusiness(foundObject)

            setLoading(false);

            // const selectedBusiness = await fetchRecordBySlug(slug);
            // console.log(selectedBusiness);
            // setSelectedBusiness(selectedBusiness);
            // setLoading(false);
            // try {
            //     const response = await fetch(businessUrl);
            //     if (!response.ok) {
            //         throw new Error('Failed to fetch data');
            //     }
            //     const result = await response.json();
            //     setSelectedBusiness(result?.items?.[0]);
            //     setLoading(false);
            // } catch (err) {
            //     setError(err.message);
            //     setLoading(false);
            // }
        };

        fetchData();
    }, [slug]);


    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!selectedBusiness) {
        return (
            <div className="text-center my-5">No data found</div>
        )
    }


    const getStars = () => {
        return (selectedBusiness?.business_stars) ? <Stars totalStars={selectedBusiness?.business_stars} /> : ''
    }


    const goToMap = () => {

    }
    return (
        <section className="bg-white">
            <div className="container w-full px-5 py-6 mx-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">
                <div className="flex flex-col lg:items-center sm:px-5 md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="block h-100">
                            <img className="object-cover w-full h-full rounded-lg max-h-64 sm:max-h-96" src={(selectedBusiness?.image) ? selectedBusiness?.image : getThumbFromUrl(selectedBusiness?.video_url)} alt="Business Image" />
                        </div>
                        {/* <ReactPlayer src={selectedBusiness?.video_url} /> */}
                    </div>
                    <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-center pt-6 md:py-6">
                        <div className="w-full flex flex-col items-start justify-center h-full space-y-3 transform md:pl-10 lg:pl-16 md:space-y-5">

                            <h1 className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl"><p>{selectedBusiness?.business_name}</p></h1>
                            <div className="flex flex-row items-start justify-center">
                                <div className="text-sm text-gray-600 flex items-center align-center">
                                    {getStars()}
                                </div>
                                {/* <span className="mt-2 ms-2">({selectedBusiness?.business_reviews} )Reviews</span> */}
                            </div>
                            <div className="w-full flex flex-col lg:flex-row flex-wrap items-center gap-4">
                                <div className="w-full lg:w-48">
                                    <button disabled className="bg-gray-200 w-full hover:bg-gray-400 font-bold py-2 px-4 rounded text-black">
                                        <a className="text-black"
                                            // onClick={() =>
                                            //   aa('convertedObjectIDsAfterSearch', {
                                            //     userToken: userAuth.email.split('@')[0],
                                            //     index: 'BusinessesPage',
                                            //     eventName: 'Call Business from Search',
                                            //     queryID: hit.__queryID,
                                            //     objectIDs: [hit.objectID],
                                            //   })
                                            // }
                                            href={`tel:${selectedBusiness?.phone ?? '#'}`}>{selectedBusiness?.phone?.length > 0 ? selectedBusiness?.phone : 'Not Available'}</a>
                                    </button>
                                </div>
                                <div className="w-full lg:w-48">
                                    <button className="flex w-full bg-green-400 hover:bg-green-500 font-bold py-2 px-4 rounded text-white items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        <span className="text-white pl-4">Message</span>
                                    </button>
                                </div>
                                <div className="w-full lg:w-48">
                                    <button className="flex w-full bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded items-center" onClick={() => goToMap()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-white pl-4">Show on map</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white sm:px-5">
                    {selectedBusiness?.description &&
                        <div className="box-border md:max-w-5xl flex flex-col items-center content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row">
                            <div className="box-border w-full text-black border-solid md:order-none">
                                <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                    Description
                                </h2>
                                <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                                    {selectedBusiness?.description}
                                </p>
                            </div>
                        </div>
                    }
                    <div className="box-border pb-2 md:max-w-5xl flex flex-col items-center content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row">
                        <div className="box-border w-full text-black border-solid md:order-none">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                Video
                            </h2>
                            <div className="flex flex-row flex-wrap gap-8 py-4">
                                {/* <div className="w-100"> */}
                                <ReactPlayer
                                    className="rounded-lg max-h-64 sm:max-h-96"
                                    url={selectedBusiness?.video_url}
                                    width="70%"
                                    controls
                                />
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="box-border md:max-w-5xl flex flex-col items-center content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row">
                        <div className="box-border w-full text-black border-solid md:order-none">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                Categories
                            </h2>
                            <div className="flex flex-row flex-wrap gap-8 py-4">
                                <div className="w-auto">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                        {selectedBusiness?.category}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-border md:max-w-5xl flex flex-col items-center content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row">
                        <div className="box-border w-full text-black border-solid md:order-none">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                Hours
                            </h2>
                            <div className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 lg:text-lg">
                                <ul className="md:max-w-[350px] p-0 m-0 leading-6 border-0 border-gray-300">
                                    {weekHours.map((day, idx) => {
                                        return <li key={idx} className="box-border flex items-center justify-between relative py-1 pl-0 text-left text-gray-500 border-solid cursor-pointer hover:text-green-400">
                                            <span className="inline-flex items-center w-20 mr-8"><span className="text-sm font-bold">{day.day}</span></span>
                                            <span>{(day?.colsed) ? '--- closed ---' : day?.hours}</span>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="box-border md:max-w-5xl flex flex-col items-center content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row">
                        <div className="box-border w-full text-black border-solid md:order-none">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                Location
                            </h2>
                            <div className="box-border flex flex-col my-5">
                                <span>{`${selectedBusiness?.address_line1}`}</span>
                                <span>{selectedBusiness?.address_line2}</span>
                                <span>{selectedBusiness?.country}</span>
                            </div>

                            <div className="w-full h-[350px] md:h-[70vh]">
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyByidHzTxTnoSYBmbISOchbRHanQhlMRmM' }}
                                    defaultCenter={{ lat: 35.84, lng: -78.78 }}
                                    defaultZoom={11}
                                >
                                    <MapBusinessMarker lat={35.84} lng={-78.78} name="Business Name" color="blue" />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}