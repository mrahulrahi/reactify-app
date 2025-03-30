// 'use client';
'use client'

import Link from "next/link";
import "./Breadcrumbs.css";

const Breadcrumbs = ({ heading, prevTitle, prevPath }) => {
   return (
      <nav aria-label="breadcrumb">
         <ol className="breadcrumb">
            <li className="breadcrumb-item">
               <Link href={prevPath}>{prevTitle}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
               {heading ? heading : "Trip to North Japan"}
            </li>
         </ol>
      </nav>
   );
};

export default Breadcrumbs;
