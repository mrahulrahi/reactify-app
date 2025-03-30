"use client";
import { useEffect } from "react";
import "../form.css";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
   useEffect(() => {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
   }, []);

   return (
      <header id="header">
         <nav className="navbar navbar-expand-xl">
            <div className="container">
               <div className="nav-inside d-flex align-items-center justify-content-between">
                  <Link className="navbar-brand flex-shrink-0" href="/">
                     <Image
                        src="/images/logo.svg"
                        width={135}
                        height={36}
                        alt="Trundle"
                        priority
                     />
                  </Link>
               </div>
            </div>
         </nav>
      </header>
   );
};

export default Header;
