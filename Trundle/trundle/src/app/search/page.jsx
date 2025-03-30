import Image from "next/image";

const search = () => {
   return (
      <>
         <div className="content-container">
            <div className="container">
               <div className="row">
                  <div className="col-xl-10 mx-auto">
                     <div className="search-empty-box d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="search-empty-icon">
                           <Image
                              src="/images/search-empty-icon.svg"
                              alt="search empty icon"
                              width={203}
                              height={106}
                           />
                        </div>
                        <h5>No results found</h5>
                        <p>
                           Try adjusting your search <br /> to find what you are
                           looking for
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="content-container">
            <div className="container">
               <div className="row">
                  <div className="col-xl-10 mx-auto">
                     <div className="heading d-flex align-items-center justify-content-between">
                        <div className="heading-left">
                           <div className="search-head">
                              <h5>
                                 <span className="text-purple">550</span>{" "}
                                 results in itineraries{" "}
                                 <em>(Showing 1-10 Itineraries)</em>
                              </h5>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default search;
