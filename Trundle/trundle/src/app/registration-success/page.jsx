import InnerHero from "../components/inner-hero/InnerHero";
import MidContainer from "../components/mid-container/MidContainer";
import Image from "next/image";
import Link from "next/link";

const RegistrationSuccessPage = () => {
   return (
      <>
         <InnerHero />
         <MidContainer>
            <div className="registration-success-box text-center">
               <div className="rsb-icon">
                  <Image
                     src="/images/tick-icon.svg"
                     width={42}
                     height={40}
                     alt="Success"
                  />
               </div>
               <h3>
                  Well done! We welcome you to <br />
                  our Influencer community
               </h3>
               <p className="opacity-60">
                  Please go ahead and create your itinerary
               </p>
               <div className="form-group mb-3">
                  <Link
                     href="/influencer/create-itinerary"
                     className="btn btn-primary"
                  >
                     <span>
                        <Image
                           src="/images/upload-icon.svg"
                           width={20}
                           height={19}
                           alt="Create Itinerary"
                        />
                     </span>{" "}
                     Upload Itinerary
                  </Link>
               </div>
               <div className="form-group">
                  <Link href="/influencer/my-profile" className="link">
                     Go to My Profile
                  </Link>
               </div>
            </div>
         </MidContainer>
      </>
   );
};

export default RegistrationSuccessPage;
