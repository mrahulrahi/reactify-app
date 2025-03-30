import "./myprofile.css";
import Image from "next/image";
import Link from "next/link";
import InnerHero from "../../components/inner-hero/InnerHero";
import { FaYoutube, FaXTwitter, FaInstagram, FaTwitch } from "react-icons/fa6";
import { MyItineraries } from "./my-itineraries/MyItineraries";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOptions";
import { getTrundlerDetails } from "../../lib/trundler/getTrundlerDetails";
import { Suspense } from "react";
import { Loading } from "../../components/loading/Loading";
import ProfilePlaceHolder from "../../components/profile-placeholder/ProfilePlaceHolder"

export async function generateMetadata() {

   return {
      title: "My Profile",
      description: "Description for trundlers",
      openGraph: {
         images: [
            {
               url: "https://api.trundle.me/static/assets/logo_.jpg",
               width: 1200,  // common recommended width
               height: 630   // common recommended height
            },
         ],
      },
   }
}

export default async function MyProfile() {
   const session = await getServerSession(authOptions);

   const userId = session?.user?.user_id;

   const trundlerProfile = await getTrundlerDetails({ userId });

   function fixUrl(url) {
      // Check if the URL starts with http://, https://, or www.
      if (!/^https?:\/\//i.test(url)) {
         // Check if the URL starts with www. but doesn't have http:// or https://
         if (/^www\./i.test(url)) {
            // Prepend https:// to the URL if it starts with www. but doesn't have http:// or https://
            url = "https://" + url;
         } else {
            // Otherwise, prepend http:// to the URL
            url = "http://" + url;
         }
      }
      return url;
   }

   return (
      <Suspense fallback={<Loading />}>
         <InnerHero heading="" subHeading="" />
         <div className="my-profile-container position-relative">
            <div className="content-container p-0">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-6 col-lg-8 mx-auto">
                        <div className="my-profile-head d-flex flex-column align-items-center text-center">
                           {trundlerProfile?.data?.photo ?
                              <div className="mp-img">
                                 <div className="mp-img-inner">
                                    <Image
                                       priority
                                       src={trundlerProfile?.data?.photo}
                                       width={160}
                                       height={160}
                                       alt="username"
                                    />
                                 </div>
                              </div> :
                              <ProfilePlaceHolder
                                 marginTop={4}
                                 width={120}
                                 height={120}
                                 border="4px solid white"
                                 name={`${trundlerProfile?.data?.first_name} ${trundlerProfile?.data?.last_name}`}
                              />
                           }
                           <Link
                              href={`/influencer/update-influencer-profile`}
                              className="btn btn-primary bg-transparent border-0 mb-2"
                           >
                              Update profile
                           </Link>
                           <h2 className="mp-name mb-1">
                              {trundlerProfile?.data?.first_name}{" "}
                              {trundlerProfile?.data?.middle_name}{" "}
                              {trundlerProfile?.data?.last_name}{" "}
                           </h2>
                           <div className="mp-profile mb-2">
                              {trundlerProfile?.data?.job_role}
                           </div>
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
                           {trundlerProfile?.data?.content_covers?.length > 0 &&
                              <div className="mp-tags mb-3 flex-wrap d-flex gap-2">
                                 {trundlerProfile?.data?.content_covers?.map(
                                    (data, index) => (
                                       <p className="mb-0" key={index}>
                                          #{data?.name}
                                       </p>
                                    )
                                 )}
                              </div>
                           }
                           {
                              trundlerProfile?.data?.discount_code &&
                              <div className="mp-coupon mb-3">
                                 {trundlerProfile?.data?.discount_code}
                              </div>
                           }
                           <ul className="mp-social-list d-flex align-items-center">
                              {trundlerProfile?.data?.youtube_link?.length > 0 &&
                                 <li>
                                    <a
                                       href={fixUrl(trundlerProfile?.data?.youtube_link)}
                                       target="_blank"
                                    >
                                       <FaYoutube />
                                    </a>
                                 </li>
                              }
                              {trundlerProfile?.data?.x_link?.length > 0 &&
                                 <li>
                                    <a
                                       href={fixUrl(trundlerProfile?.data?.x_link)}
                                       target="_blank"
                                    >
                                       <FaXTwitter />
                                    </a>
                                 </li>
                              }
                              {trundlerProfile?.data?.instagram_link?.length > 0 &&
                                 <li>
                                    <a
                                       href={fixUrl(trundlerProfile?.data?.instagram_link)}
                                       target="_blank"
                                    >
                                       <FaInstagram />
                                    </a>
                                 </li>
                              }
                              {trundlerProfile?.data?.twitch_link?.length > 0 &&
                                 <li>
                                    <a
                                       href={fixUrl(trundlerProfile?.data?.twitch_link)}
                                       target="_blank"
                                    >
                                       <FaTwitch />
                                    </a>
                                 </li>
                              }
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <MyItineraries
               active_itineraries={trundlerProfile?.data?.active_itineraries}
               itineraries_bought={trundlerProfile?.data?.itineraries_bought}
               followed_count={trundlerProfile?.data?.followed_count}
               total_amount_earned={trundlerProfile?.data?.total_amount_earned}
               transferedAmount={trundlerProfile?.data?.transferred_to_your_account}
               next_invoice_amount={trundlerProfile?.data?.next_invoice_amount}
               next_payment_due_date={trundlerProfile?.data?.next_payment_due_date}
            />
         </div>
      </Suspense>
   );
}
