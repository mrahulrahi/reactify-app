"use client";

import React from "react";

export default function ErrorMessage({ error, touched, type }) {
   return (
      <>
         {type === "select" ? (
            <>
               {error && (
                  <div
                     style={{
                        fontSize: "13px",
                        padding: "5px",
                     }}
                     className="error text-danger"
                  >
                     {error}
                  </div>
               )}
            </>
         ) : (
            <>
               {error && touched && (
                  <div
                     style={{
                        fontSize: "13px",
                        padding: "5px",
                     }}
                     className="error text-danger"
                  >
                     {error}
                  </div>
               )}
            </>
         )}
      </>
   );
}
