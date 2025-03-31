import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { currentBusinessState, localeState, searchHitState, userLoginState } from "../../../context/appState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useBusiness } from "../../../hooks/state";
import Stars from "../../Utils/Stars/Stars";
import GoogleMapReact from 'google-map-react';
import MapBusinessMarker from "../../Utils/MapBusinessMarker/MapBusinessMarker";
import aa from 'search-insights';

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
    const [selectedBusiness, setSelectedBusiness] = useRecoilState(currentBusinessState);
    const currentLocale = useRecoilValue(localeState)
    const userAuth = useRecoilValue(userLoginState);
    const [workDays, setWorkDays] = useState(weekHours)
    const hit = useRecoilValue(searchHitState)
    let params = useParams();

    useBusiness()
    useEffect(() => {
        async function getBusiness() {
            // the url is temporary need to change once certs have been properly configured
            const url = `https://top10cms.link/api/v2/pages/?fields=*&type=businesses.BusinessesPage&slug=${params?.name}&locale=${currentLocale}`
            const serverRes = await fetch(url);
            const business = await serverRes.json()
            if (business?.items?.[0]?.businesses_businesshoursorderables) {
                if (Object.values(business?.items?.[0]?.businesses_businesshoursorderables)?.length > 0) {
                    setWorkDays(Object.values(business?.items?.[0]?.businesses_businesshoursorderables)?.map(hrs => {
                        return {
                            day: hrs?.businesses_businesshour?.weekday ?? '',
                            hours: (!hrs?.businesses_businesshour?.closed) ? `${hrs?.businesses_businesshour?.from_hour?.substring(0, hrs?.businesses_businesshour?.from_hour?.length - 3) ?? ''} - ${hrs?.businesses_businesshour?.to_hour?.substring(0, hrs?.businesses_businesshour?.to_hour?.length - 3) ?? ''}` : '-- CLOSED --'
                        }
                    }))
                }
            }
            setSelectedBusiness(business?.items?.[0]);
        }
        getBusiness();
    }, [currentLocale, setSelectedBusiness, params?.name])

    const getStars = () => {
        return (selectedBusiness?.business_stars) ? <Stars stars={selectedBusiness?.business_stars} /> : ''
    }
    const goToMap = () => {

    }
    return <section className="bg-white">
        <div className="w-full px-5 py-6 mx-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">

            <div className="flex flex-col items-center sm:px-5 md:flex-row">
                <div className="w-full md:w-1/2">
                    <a href="#_" className="block">
                        <img className="object-cover w-full h-full rounded-lg max-h-64 sm:max-h-96" src={(selectedBusiness?._image_url) ? selectedBusiness?._image_url : "https://cdn.devdojo.com/images/may2021/cupcakes.jpg"} alt="Savory Cupcakes" />
                    </a>
                </div>
                <div className="flex flex-col items-start justify-center w-full h-full py-6 mb-6 md:mb-0 md:w-1/2">
                    <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pl-10 lg:pl-16 md:space-y-5">

                        <h1 className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl"><a href="#_">{selectedBusiness?.title ?? 'Mme Cupcake'}</a></h1>
                        <div className="flex flex-row items-start justify-center ">
                            <div className="text-sm text-gray-600 flex items-center align-center">
                                {getStars()}
                            </div>
                            <span className="mt-1 pl-1">({selectedBusiness?.business_reviews} )Reviews</span>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center w-full ">
                            <div className="px-2 p-3 sm:p-2 w-full lg:w-48">
                                <button className="bg-gray-200 w-full hover:bg-gray-400 font-bold py-2 px-4 rounded text-black">
                                    <a className="text-black"
                                        onClick={() =>
                                            aa('convertedObjectIDsAfterSearch', {
                                                userToken: userAuth.email.split('@')[0],
                                                index: 'BusinessesPage',
                                                eventName: 'Call Business from Search',
                                                queryID: hit.__queryID,
                                                objectIDs: [hit.objectID],
                                            })
                                        }
                                        href={`tel:${selectedBusiness?.business_phone ?? '#'}`}>{selectedBusiness?.business_phone ?? 'Not Available'}</a>
                                </button>
                            </div>
                            <div className="px-2 p-2 sm:p-2 w-full lg:w-48">
                                <button className="flex w-full bg-green-400 hover:bg-green-500 font-bold py-2 px-4 rounded text-white items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <span className="text-white pl-4">Message</span>
                                </button>
                            </div>
                            <div className="px-2 p-2 sm:p-2 w-full lg:w-48">
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
            <div className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
                <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row lg:px-16">

                    <div className="box-border w-full text-black border-solid md:pl-10 md:order-none">
                        <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                            Description
                        </h2>
                        <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                            {selectedBusiness?.business_description ?? 'Lorem Ipsum'}
                        </p>
                    </div>

                </div>
                <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row lg:px-16">

                    <div className="box-border w-full text-black border-solid md:pl-10 md:order-none">
                        <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                            Categories
                        </h2>
                        <div className="flex flex-row py-4">
                            <div className="px-4">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                    {selectedBusiness?.businesses_businesssector?.name}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row lg:px-16">
                    <div className="box-border w-full text-black border-solid md:pl-10 md:order-none">
                        <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                            Hours
                        </h2>
                        <div className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                                {workDays.map((day, idx) => {
                                    return <li key={idx} className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid cursor-pointer hover:text-green-400">
                                        <span className="inline-flex items-center justify-center w-6 h-6 mr-2"><span className="text-sm font-bold">{days[day.day]}</span></span>
                                        <span className="ml-24">{(day?.colsed) ? '--- closed ---' : day?.hours}</span>
                                    </li>
                                })}

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row lg:px-16">
                    <div className="box-border w-full text-black border-solid md:pl-10 md:order-none">
                        <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                            Location
                        </h2>
                        <div className="box-border flex flex-col">
                            <span>{selectedBusiness?.business_street_address}</span>
                            <span>{`${selectedBusiness?.business_city}, ${selectedBusiness?.business_state}`}</span>
                            <span>{selectedBusiness?.business_country}</span>
                        </div>

                        <div style={{ height: '100vh', width: '100%' }}>
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
}