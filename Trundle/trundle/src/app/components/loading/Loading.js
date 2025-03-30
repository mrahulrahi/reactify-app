import React from "react";

export function Loading() {
   return (
      <div className="container d-flex justify-content-center">
         <div
            style={{
               color: "#6f27ff",
            }}
            className="my-5 spinner-border"
            role="status"
         />
      </div>
   );
}
