"use client";

import React, { useEffect, useState } from "react";
import Search from "../../components/search/Search";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Notifications from "../../components/notifications/Notifications"
import SearchButton from "../../components/searchButton/SearchButton"

export const NavList = ({
   session,
   countriesList,
   notificationList
}) => {
   useEffect(() => {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
   }, []);

   const router = useRouter();

   const currentPath = usePathname();

   const isAuthPage = ["/auth/signin", "/auth/signup", "/create-influencer-profile"];

   const role = session?.user?.user_role;

   const [naveCollapse, setNavCollapse] = useState(false);

   return (
      <>
         {currentPath === '/onboard' ? null :
            <>
               {currentPath !== "/otp-verification" &&
                  currentPath !== "/forgot-password" &&
                  (
                     <>
                        {!isAuthPage.includes(currentPath) ? (
                           <>
                              <button
                                 className={`navbar-toggler ${!naveCollapse && `collapsed`}`}
                                 onClick={() => setNavCollapse(!naveCollapse)}
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#mainNav"
                                 aria-controls="mainNav"
                                 aria-expanded="false"
                                 aria-label="Toggle navigation"
                              >
                                 <span className="navbar-toggler-icon"></span>
                              </button>
                              {(currentPath === "/itineraries" ||
                                 currentPath === "/influencers" || currentPath === "/traveller/my-itineraries") && (
                                    <>
                                       <Search countriesList={countriesList} />
                                       <div className="d-sm-none ms-auto">
                                          <SearchButton />
                                       </div>
                                    </>
                                 )}
                              <div className="nav-right d-flex align-items-center">
                                 <div
                                    className={`collapse navbar-collapse justify-content-end ${naveCollapse && 'show'}`}
                                    id="mainNav"
                                 >
                                    <div className="navbar-inside d-flex">
                                       <ul className="navbar-nav">
                                          <li
                                             onClick={() => setNavCollapse(false)}
                                             className={`${currentPath ===
                                                "/itineraries"
                                                ? "nav-item active me-0"
                                                : "nav-item me-0"
                                                }`}
                                          >
                                             <Link
                                                className="nav-link me-3"
                                                href="/itineraries"
                                             >
                                                Itineraries
                                             </Link>
                                          </li>
                                          {/* <li
                                       onClick={() => setNavCollapse(false)}
                                       className={`${currentPath === "/traveller/influencers"
                                          ? "nav-item active"
                                          : "nav-item"
                                          }`}
                                    >
                                       <Link
                                          className="nav-link"
                                          href="/traveller/influencers"
                                       >
                                          Influencers
                                       </Link>
                                    </li> */}
                                          {/* <li
                                       onClick={() => setNavCollapse(false)}
                                       className={`${currentPath === "/help-plan-my-trip"
                                          ? "nav-item active"
                                          : "nav-item"
                                          }`}
                                    >
                                       <Link
                                          className="nav-link"
                                          href="/help-plan-my-trip"
                                       >
                                          Help Plan My Trip
                                       </Link>
                                    </li> */}
                                          {session?.user?.access_token &&
                                             <li style={{ borderWith: "1px", border: "1px solid", height: "22px", borderColor: "#D9D9D9" }} className="my-auto nav-item d-xl-block d-none" />
                                          }
                                          {role === 2 && (
                                             <>
                                                <li
                                                   onClick={() => setNavCollapse(false)}
                                                   className={`${currentPath ===
                                                      "/traveller/my-itineraries"
                                                      ? "nav-item active"
                                                      : "nav-item"
                                                      }`}
                                                >
                                                   <Link
                                                      className="nav-link"
                                                      href="/traveller/my-itineraries"
                                                   >
                                                      My itineraries
                                                   </Link>
                                                </li>
                                                {session &&
                                                   <Notifications
                                                      notificationList={notificationList}
                                                      session={session}
                                                      classNames={`nav-item dropdown nav-notification-btn d-none d-xl-block position-relative`}
                                                   />
                                                }
                                                <li className={`nav-item dropdown nav-profile-link d-xl-flex align-items-center ${(currentPath === `/traveller/my-profile` || currentPath === `/traveller/my-orders`) && `active`}`}>
                                                   <div
                                                      className="nav-link d-flex align-items-center"
                                                   >
                                                      <div className="header-profile-img d-flex align-items-start">
                                                         <span className="hp-img d-none d-xl-flex">
                                                            <FaRegUserCircle />
                                                         </span>
                                                         <span className="hp-arrow d-none d-xl-flex">
                                                            <FaSortDown />
                                                         </span>
                                                      </div>
                                                      <span
                                                         onClick={() => {
                                                            setNavCollapse(false)
                                                            router.push(`/traveller/my-profile`)
                                                         }} className="d-xl-none cursor-pointer">
                                                         My Account
                                                      </span>
                                                   </div>
                                                   <em
                                                      className="dropdown-toggle d-xl-none"
                                                      data-bs-toggle="dropdown"
                                                      aria-expanded="false"
                                                      role="button"
                                                   >
                                                      <b className="plus">
                                                         <FaPlus />
                                                      </b>
                                                      <b className="minus">
                                                         <FaMinus />
                                                      </b>
                                                   </em>
                                                   <ul className="dropdown-menu dropdown-menu-end">
                                                      <li
                                                         onClick={() => setNavCollapse(false)}
                                                      >
                                                         <button
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                               router.push(
                                                                  "/traveller/my-profile"
                                                               );
                                                            }}
                                                         >
                                                            My profile
                                                         </button>
                                                      </li>
                                                      <li
                                                         onClick={() => setNavCollapse(false)}
                                                      >
                                                         <button
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                               router.push(
                                                                  "/traveller/my-orders"
                                                               );
                                                            }}
                                                         >
                                                            My orders
                                                         </button>
                                                      </li>
                                                      <li
                                                         onClick={() => setNavCollapse(false)}
                                                      >
                                                         <button
                                                            className="dropdown-item"
                                                            onClick={async () => {
                                                               await signOut({
                                                                  redirect: false,
                                                               });
                                                               router.push(
                                                                  "/auth/signin"
                                                               );
                                                               localStorage.clear();
                                                               router.refresh();
                                                            }}
                                                         >
                                                            Logout
                                                         </button>
                                                      </li>
                                                   </ul>
                                                </li>
                                             </>
                                          )}
                                          {!session && (
                                             <div className="nav-right d-flex align-items-center">
                                                <div className="header-btn d-flex align-items-center gap-3">
                                                   <Link
                                                      href="/auth/signin"
                                                      className="btn btn-primary no-min"
                                                   >
                                                      Sign in
                                                   </Link>
                                                   <Link
                                                      href="/auth/signup"
                                                      className="btn btn-default no-min"
                                                   >
                                                      Sign up
                                                   </Link>
                                                </div>
                                             </div>
                                          )}
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                              {session &&
                                 <Notifications
                                    session={session}
                                    notificationList={notificationList}
                                    classNames={`dropdown nav-notification-btn d-xl-none flex-shrink-0 position-relative`}
                                 />
                              }
                           </>
                        ) : (
                           <div className="nav-right d-flex align-items-center">
                              <div className="header-btn d-flex flex-md-row flex align-items-center gap-3 gap-xl-2">
                                 <p className="mb-0 me-2">
                                    {`${currentPath === `/auth/signin`
                                       ? `Don't`
                                       : `Already`
                                       } have an account?`}
                                 </p>
                                 {currentPath === `/auth/signup` ? (
                                    <Link
                                       href="/auth/signin"
                                       className="btn btn-primary no-min"
                                    >
                                       Sign in
                                    </Link>
                                 ) : (
                                    <Link
                                       href={currentPath === '/auth/signin' ? `/auth/signup` : `/auth/signin`}
                                       className={`btn btn-${currentPath === '/auth/signin' ? `default` : `primary`} no-min`}
                                    >
                                       {currentPath === '/auth/signin' ? `Sign up` : `Sign in`}
                                    </Link>
                                 )}
                              </div>
                           </div>
                        )}
                     </>
                  )}
            </>
         }
      </>


   );
};
