import "./TrundlerCard.css";
import Image from "next/image";
import Link from "next/link";

const TrundlerCard = ({ trundlerDetails }) => {
   return (
      <>
         <div className="trundler-card-box w-100 h-100 d-flex overflow-hidden position-relative">
            <div className="trundler-card-inside w-100 h-100 mt-auto d-flex flex-column">
               <div className="trundler-card-img mx-auto mb-2">
                  {trundlerDetails?.photo && (
                     <Link
                        href={`/${trundlerDetails?.username}`}
                     >
                        <Image
                           src={trundlerDetails?.photo}
                           width={80}
                           height={80}
                           alt="user img"
                           sizes="100VW"
                        />
                     </Link>
                  )}
                  {parseInt(trundlerDetails?.following_status) === 1 &&
                     <div style={{
                        backgroundColor: "#DFDCE9",
                        borderRadius: "5px",
                        width: "65px",
                        height: "19px",
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: "13px",
                        right: "13px"
                     }} className="text-danger"><p style={{
                        fontFamily: "Inter",
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#534784"
                     }} className="Following">Following</p></div>
                  }
               </div>
               <Link
                  href={`/${trundlerDetails?.username}`}
                  className="trundler-card-name-box mx-auto text-center cursor-pointer">
                  <div className="d-flex flex-wrap gap-2 mb-2 align-items-center justify-content-center">
                     <h6 className="mb-0">{trundlerDetails?.first_name}</h6>
                     {trundlerDetails?.middle_name && (
                        <h6 className="mb-0">{trundlerDetails?.middle_name}</h6>
                     )}
                     <h6 className="mb-0">{trundlerDetails?.last_name}</h6>
                  </div>
                  <p>{trundlerDetails?.username}</p>
               </Link>
               <div className="tcc-list mb-4 d-flex">
                  <div className="tcc-item flex-grow-1">
                     <div className="tcc-box text-start d-flex">
                        <div className="tcc-box-no">
                           {trundlerDetails?.country_visited}
                        </div>
                        Country Visited
                     </div>
                  </div>
                  <div className="tcc-item flex-grow-1">
                     <div className="tcc-box text-start d-flex">
                        <div className="tcc-box-no">
                           {trundlerDetails?.active_itineraries}
                        </div>
                        Active itineraries
                     </div>
                  </div>
                  <div className="tcc-item">
                     <div className="tcc-box text-start d-flex">
                        <div className="tcc-box-no">
                           {trundlerDetails?.itineraries_bought}
                        </div>
                        Itineraries bought
                     </div>
                  </div>
               </div>
               <div className="trundler-card-cta mt-auto">
                  <Link
                     href={`/${trundlerDetails?.username}`}
                     className="btn btn-primary btn-block"
                  >
                     View profile
                  </Link>
               </div>
            </div>
         </div >
      </>
   );
};

export default TrundlerCard;
