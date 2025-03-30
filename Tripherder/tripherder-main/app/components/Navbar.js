"use client";

import { Navbar, Nav } from "react-bootstrap";
import { logoutUser } from "../store/slices/auth";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomNavbar() {
   const dispatch = useDispatch();

   const pathname = usePathname();

   return (
      <div
         className="navbar-header container-fluid p-0"
         style={{ backgroundColor: "lightgray" }}
      >
         <Navbar bg="light" expand="lg" className="container bg-transparent">
            <Link href={"/"} className="text-decoration-none">
               <Navbar.Brand className="px-1 rounded cursor-pointer">
                  <span className="px-1 fw-bold text-light">Trip</span>
                  <span className="bg-warning text-light rounded px-1">
                     Herder
                  </span>
               </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto d-flex align-items-center justify-content-center">
                  <Link
                     href={"/user-preferences"}
                     className="bg-transparent border-0 text-decoration-none mx-4 text-dark"
                  >
                     Preferences
                  </Link>
                  <Link
                     href={`${pathname === "/" ? `/itineraries` : `/`}`}
                     className={`border-0 text-decoration-none mx-4 btn fw-bold text-light ${
                        pathname === `/` ? `btn-warning` : `btn-primary`
                     }`}
                  >
                     {pathname === "/" ? "Go to Development" : "Go to Testing"}
                  </Link>
                  <Link
                     href="/signin"
                     className="bg-danger rounded text-light border-0 text-decoration-none px-3 py-1"
                     onClick={async () => {
                        await dispatch(logoutUser());
                        localStorage?.clear();
                     }}
                  >
                     Logout
                  </Link>
               </Nav>
            </Navbar.Collapse>
         </Navbar>
      </div>
   );
}
