import React from "react";
import TrundlerHeader from "./Header";
export default function OnBoard({ children }) {
   return (
      <>
         <TrundlerHeader />
         {children}
      </>
   );
}
