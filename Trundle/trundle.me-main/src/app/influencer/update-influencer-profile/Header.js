"use client";
import { useEffect } from "react";
import "../../form.css";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { signOut } from "next-auth/react";

const TrundlerHeader = () => {
   useEffect(() => {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
   }, []);

   return (
      <header id="header">
         <nav className="navbar navbar-expand-xl">
            <div className="container">
               <div className="nav-inside d-flex align-items-center justify-content-between">
                  <Link
                     className="navbar-brand flex-shrink-0"
                     href="/influencer/my-profile"
                  >
                     <Image
                        src="/images/logo.svg"
                        width={135}
                        height={36}
                        alt="Trundle"
                        priority
                     />
                  </Link>
                  <ul className="navbar-nav">
                     <li className="nav-item dropdown nav-profile-link d-xl-flex align-items-center">
                        <div className="nav-link d-flex align-items-center">
                           <div className="header-profile-img d-flex align-items-start">
                              <span className="hp-img">
                                 <FaRegUserCircle />
                              </span>
                              <span className="hp-arrow d-xl-flex">
                                 <FaSortDown />
                              </span>
                           </div>
                        </div>
                        <ul className="dropdown-menu dropdown-menu-end">
                           <li>
                              <Link
                                 className="dropdown-item"
                                 href="/create-influencer-profile"
                              >
                                 <LuPencil /> Edit
                              </Link>
                           </li>
                           <li
                              onClick={async () => {
                                 await signOut({
                                    redirect: false,
                                 });
                                 localStorage.clear();
                                 history.pushState(
                                    null,
                                    null,
                                    location.href
                                 );
                                 window.onpopstate = function () {
                                    history.go(1);
                                 };
                              }}
                           >
                              <Link
                                 className="dropdown-item"
                                 href={"/auth/signin"}
                              >
                                 <TbLogout /> Logout
                              </Link>
                           </li>
                        </ul>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </header>
   );
};

export default TrundlerHeader;
