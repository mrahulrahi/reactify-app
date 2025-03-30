"use client";
import "./MidContainer.css";

const MidContainer = ({ children, size }) => {
   return (
      <>
         <div className="content-container position-relative pt-0 ">
            <div className="container">
               <div className="row">
                  <div className="col-lg-8 mx-auto">
                     <div
                        className={
                           size === "lg"
                              ? `page-content-box lg`
                              : size === "sm"
                                 ? `page-content-box sm`
                                 : `page-content-box`
                        }
                     >
                        {children}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default MidContainer;
