'use client'

import "./InfluencerCard.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfilePlaceHolder from "../profile-placeholder/ProfilePlaceHolder";

const InfluencerCard = ({ influencer }) => {

   const router = useRouter();

   return (
      <>
         <div className="user-card-box d-flex flex-column align-items-center">
            {influencer?.photo ?
               <div className="user-card-img">
                  <Image
                     className="cursor-pointer"
                     onClick={() => router.push(`/${influencer?.username}`)}
                     src={influencer?.photo}
                     alt="user img"
                     fill
                     sizes="100VW"
                  />
               </div> :
               <ProfilePlaceHolder
                  marginTop={0}
                  marginBottom={2}
                  width={95}
                  height={95}
                  border={"5px solid white"}
                  name={`${influencer?.first_name} ${influencer?.last_name}`}
               />
            }
            <h6 className="cursor-pointer"
               onClick={() => router.push(`/${influencer?.username}`)}>{influencer?.first_name}</h6>
            <div className="user-card-btn mt-auto">
               <Link
                  href={`/${influencer?.username}`}
                  className="btn btn-primary btn-xs"
               >
                  View
               </Link>
            </div>
         </div>
      </>
   );
};

export default InfluencerCard;
