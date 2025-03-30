import "./ProfileCard.css";
import Image from "next/image";
import Link from "next/link";
import ProfilePlaceHolder from "../profile-placeholder/ProfilePlaceHolder";

const ProfileCard = ({ userDetails }) => {
   return (
      <>
         <div className="profile-card-box">
            <div className="pcb-head d-flex mb-3">
               <div className="pcb-left flex-shrink-0">
                  <Link href={`/${userDetails?.username}`} className="pcb-img d-flex align-items-center justify-content-center">
                     {userDetails?.photo ?
                        <Image
                           src={userDetails?.photo ? userDetails?.photo : `/images/placeholder_user.svg`}
                           width={70}
                           height={70}
                           alt="user img"
                           style={{
                              borderRadius: "50%",
                              objectFit: "cover"
                           }}
                        /> :
                        <ProfilePlaceHolder
                           marginTop={0}
                           marginBottom={0}
                           width={64}
                           height={64}
                           border={"2px solid white"}
                           name={`${userDetails?.first_name} ${userDetails?.last_name}`}
                        />}
                  </Link>
               </div>
               <div className="pcb-right d-flex flex-column">
                  <Link href={`/${userDetails?.username}`}>
                     <h5 className="pcb-name mb-1">{userDetails?.first_name}{" "}{userDetails?.middle_name}{" "}{userDetails?.last_name}</h5>
                  </Link>
                  <div className="pcb-profile mb-1">
                     {userDetails?.job_role}
                  </div>
                  <div className="pcb-status d-flex align-items-center mb-2">
                     <div className="pcb-status-icon d-flex align-items-center justify-content-center me-2">
                        <Image
                           src="/images/trending-up-icon.svg"
                           width={14}
                           height={9}
                           alt="trending up icon"
                        />
                     </div>
                     <span className="me-1">{userDetails?.itinerary_bought_count}</span>bought last month
                  </div>
                  <div className="pcb-country-list d-flex">
                     {userDetails?.covered_countries?.map((data, index) => {
                        return (
                           <span key={index} className="d-flex align-items-center justify-content-center">
                              <Image
                                 src={data?.flag}
                                 width={28}
                                 height={17}
                                 alt="flag"
                              />
                           </span>
                        )
                     })}
                  </div>
               </div>
            </div>
            <div className="pcb-body mb-4">
               <div className="pcb-bio mb-2">
                  {userDetails?.about_myself}
               </div>
               <div className="pcb-tags mb-3 d-flex flex-wrap">
                  {userDetails?.content_covers?.map((data, index) => {
                     return (
                        <p key={index} className="mb-0 me-1">#{data?.name}</p>
                     )
                  })}
               </div>
               {userDetails?.itinerary_count > 1 &&
                  <Link href={`/${userDetails?.id}`} className="link">
                     View Other {userDetails?.itinerary_count - 1} Itineraries
                  </Link>
               }
            </div>
            <div className="pcb-footer">
               <Link href={`/${userDetails?.username}`} className="btn btn-primary">
                  View profile
               </Link>
            </div>
         </div>
      </>
   );
};

export default ProfileCard;
