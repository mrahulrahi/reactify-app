import "./Pagination.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const Pagination = () => {
   return (
      <>
         <ul className="pagination">
            <li className="page-item d-flex align-items-center justify-content-center">
               <a
                  className="page-link d-flex align-items-center justify-content-center"
                  href="#!"
               >
                  <span>
                     <MdNavigateBefore />
                  </span>
               </a>
            </li>
            <li className="page-item d-flex align-items-center justify-content-center active">
               <a
                  className="page-link d-flex align-items-center justify-content-center"
                  href="#!"
               >
                  1
               </a>
            </li>
            <li className="page-item d-flex align-items-center justify-content-center">
               <a
                  className="page-link d-flex align-items-center justify-content-center"
                  href="#!"
               >
                  2
               </a>
            </li>
            <li className="page-item d-flex align-items-center justify-content-center">
               <a
                  className="page-link d-flex align-items-center justify-content-center"
                  href="#!"
               >
                  3
               </a>
            </li>
            <li className="page-item d-flex align-items-center justify-content-center">
               <a
                  className="page-link d-flex align-items-center justify-content-center"
                  href="#!"
               >
                  ...
               </a>
            </li>
            <li className="page-item d-flex align-items-center justify-content-center">
               <a
                  className="page-link d-flex align-items-center justify-content-center"
                  href="#!"
               >
                  10
               </a>
            </li>
            <li className="page-item d-flex align-items-center justify-content-center">
               <a
                  className="page-link d-flex align-items-center justify-content-center"
                  href="#!"
               >
                  <span>
                     <MdNavigateNext />
                  </span>
               </a>
            </li>
         </ul>
      </>
   );
};

export default Pagination;
