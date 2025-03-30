"use client";

import Image from "next/image";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export const CopyToClipBoard = () => {
   const [copyStatus, setCopyStatus] = useState(false);

   const handleCopyClick = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopyStatus(true);
      setTimeout(() => {
         setCopyStatus(false);
      }, 3000);
   };

   return (
      <button
         className="btn btn-primary"
         onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            handleCopyClick();
         }}
      >
         <span>
            {copyStatus ?
               <MdContentCopy size={15} /> :
               <MdContentCopy size={15} />
            }
         </span>{" "}
         {copyStatus ? "Copied !" : "Copy Link"}
      </button>
   );
};
