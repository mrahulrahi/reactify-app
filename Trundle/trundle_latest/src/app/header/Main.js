"use client";
import React, { useEffect } from "react";

export default function Main({ children }) {
   useEffect(() => {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
   }, []);
   return <main>{children}</main>;
}
