import React from "react";

export const Loading = () => {
   return (
      <div className="d-flex align-content-center justify-content-center mt-5">
         <div
            className="spinner-border"
            style={{ width: "50px", height: "50px" }}
            role="status"
         />
      </div>
   );
};
