/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import InnerHero from "./components/inner-hero/InnerHero";
import MidContainer from "./components/mid-container/MidContainer";
import Link from "next/link";
import NotFound from "./components/not-found/NotFound";

const NotFoundPage = () => {

   return (
      <>
         {/* <InnerHero />
         <MidContainer>
            <div className="registration-success-box text-center">
               <h3>Sorry! Page not found!</h3>
               <p className="opacity-60">
                  The page you are looking fror does not exist.
               </p>
               <div className="form-group">
                  <Link href="/" className="link">
                     Go to Homepage
                  </Link>
               </div>
            </div>
         </MidContainer> */}
         <NotFound />
      </>
   );
};

export default NotFoundPage;
