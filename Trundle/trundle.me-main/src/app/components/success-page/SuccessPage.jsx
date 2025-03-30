import InnerHero from "../inner-hero/InnerHero";
import MidContainer from "../mid-container/MidContainer";
import Image from "next/image";
import Link from "next/link";

const SuccessPage = ({ contentType }) => {
   return (
      <>
         <InnerHero />
         <MidContainer>
            <div className="registration-success-box text-center">
               <div className="rsb-icon">
                  <Image
                     src="/images/tick-icon.svg"
                     width={42}
                     height={42}
                     alt="Success"
                  />
               </div>
               {contentType === "request" ? (
                  <h3>We received your request successfully</h3>
               ) : (
                  <h3>
                     Well done! We welcome you to <br />
                     our Influencer community
                  </h3>
               )}
               {contentType === "request" ? (
                  <p className="opacity-60">
                     Please check your mail to proceed further{" "}
                  </p>
               ) : (
                  <p className="opacity-60">
                     Please go ahead and create your itinerary
                  </p>
               )}
               {contentType !== "request" && (
                  <>
                     <div className="form-group mb-3">
                        <Link
                           href="/create-itinerary"
                           className="btn btn-primary"
                        >
                           <span>
                              <Image
                                 src="/images/upload-icon.svg"
                                 width={20}
                                 height={20}
                                 alt="Create Itinerary"
                              />
                           </span>{" "}
                           Upload Itinerary
                        </Link>
                     </div>
                     <div className="form-group">
                        <Link href="/my-profile" className="link">
                           Go to My Profile
                        </Link>
                     </div>
                  </>
               )}
            </div>
         </MidContainer>
      </>
   );
};

export default SuccessPage;
