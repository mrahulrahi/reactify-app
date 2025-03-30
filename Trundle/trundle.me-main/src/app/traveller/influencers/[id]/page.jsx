import "../myprofile.css";
import Image from "next/image";
import InnerHero from "../../../components/inner-hero/InnerHero";
import profileImg from "../profile-img.jpg";
import { FaYoutube, FaXTwitter, FaInstagram, FaTwitch } from "react-icons/fa6";
import { MyItineraries } from "../my-itineraries/MyItineraries";
import { getTrundlerDetails } from "../../../lib/trundler/getTrundlerDetails";
import { Suspense } from "react";
import { Loading } from "../../../components/loading/Loading";
import FollowButton from "./follow-btn/FollowButton"
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOptions";

export default async function MyProfile({ params }) {

   const session = await getServerSession(authOptions);

   const access_token = session?.user?.access_token

   const userId = params?.id

   const trundlerProfile = await getTrundlerDetails({ access_token, userId });

   return (
      <Suspense fallback={<Loading />}>
         <InnerHero heading="" subHeading="" />
         <div className="my-profile-container position-relative">
            <div className="content-container p-0">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-6 col-lg-8 mx-auto">
                        <div className="my-profile-head d-flex flex-column align-items-center text-center">
                           <div className="mp-img">
                              <div className="mp-img-inner">
                                 {trundlerProfile?.data?.photo ? (
                                    <Image
                                       priority
                                       src={trundlerProfile?.data?.photo}
                                       width={160}
                                       height={160}
                                       alt="username"
                                    />
                                 ) : (
                                    <Image
                                       src={profileImg}
                                       width={160}
                                       height={160}
                                       alt="username"
                                    />
                                 )}
                              </div>
                           </div>
                           <h2 className="mp-name mb-1">
                              {trundlerProfile?.data?.first_name}{" "}
                              {trundlerProfile?.data?.middle_name}{" "}
                              {trundlerProfile?.data?.last_name}{" "}
                           </h2>
                           <div className="mp-profile mb-2">
                              {trundlerProfile?.data?.about_myself}
                           </div>
                           <div className="mp-countries-covered mb-3 d-flex align-items-center">
                              Countries I cover{" "}
                              <div className="country-list d-flex">
                                 {trundlerProfile?.data?.covered_country?.map(
                                    (data, index) => (
                                       <span
                                          className="d-flex ms-1"
                                          key={index}
                                       >
                                          <Image
                                             width={20}
                                             height={20}
                                             src={data?.flag}
                                             alt="flag"
                                          />
                                       </span>
                                    )
                                 )}
                              </div>
                           </div>
                           <div className="mp-tags mb-3 flex-wrap d-flex gap-2">
                              {trundlerProfile?.data?.content_covers?.map(
                                 (data, index) => (
                                    <p className="mb-0" key={index}>
                                       #{data?.name}
                                    </p>
                                 )
                              )}
                           </div>
                           <div className="mp-coupon mb-3">
                              {trundlerProfile?.data?.discount_code}
                           </div>
                           <ul className="mp-social-list d-flex align-items-center mb-4">
                              <li>
                                 <a
                                    href={trundlerProfile?.data?.youtube_link}
                                    target="_blank"
                                 >
                                    <FaYoutube />
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href={trundlerProfile?.data?.x_link}
                                    target="_blank"
                                 >
                                    <FaXTwitter />
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href={trundlerProfile?.data?.instagram_link}
                                    target="_blank"
                                 >
                                    <FaInstagram />
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href={trundlerProfile?.data?.twitch_link}
                                    target="_blank"
                                 >
                                    <FaTwitch />
                                 </a>
                              </li>
                           </ul>
                           <FollowButton access_token={access_token} _data={{ trundler: parseInt(trundlerProfile?.data?.id) }} followingStatus={trundlerProfile?.data?.following_status} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {trundlerProfile?.data?.itineraries?.length > 0 ?
               <MyItineraries itinerariesList={trundlerProfile?.data?.itineraries} /> :
               <div className="content-container">
                  <div className="container">
                     <div className="row">
                        <div className="col-xl-10 mx-auto">
                           <div className="search-empty-box pt-5 d-flex flex-column align-items-center justify-content-center text-center">
                              <div className="search-empty-icon">
                                 <Image
                                    src="/images/search-empty-icon.svg"
                                    alt="search empty icon"
                                    width={203}
                                    height={106}
                                 />
                              </div>
                              <h5>No results found</h5>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>}
         </div>
      </Suspense>
   );
}
