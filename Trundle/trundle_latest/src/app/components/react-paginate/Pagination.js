"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({ itinerariesList }) => {
   const perPage = itinerariesList?.per_page;

   const pageCount = Math?.ceil(itinerariesList?.count / perPage);

   const searchParams = useSearchParams();

   const pathname = usePathname();

   const router = useRouter();

   const params = new URLSearchParams(searchParams);

   const forcePage = params?.get("page") ? params?.get("page") - 1 : 0;

   const createQueryString = useCallback(
      async (name, value) => {
         const params = new URLSearchParams(searchParams);
         params.set(name, value); // Set the new parameter value
         await router.push(`${pathname}/?${params.toString()}`);
         return params.toString();
      },
      [pathname, router, searchParams]
   );

   const handlePageChange = ({ selected }) => {
      createQueryString("page", selected + 1);
   };

   return (
      <div className="row">
         <div className="col-xl-10 mx-auto">
            <div className="d-flex align-items-center justify-content-center w-100 mt-lg-5 mt-md-4 mt-3">
               <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={pageCount}
                  key={`paginate${itinerariesList?.results?.data?.id}`}
                  forcePage={forcePage}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChange}  
                  containerClassName={"pagination"}
                  pageClassName="page-item d-flex align-items-center justify-content-center"
                  activeClassName={"page-item d-flex align-items-center justify-content-center active"}
                  previousLinkClassName={"page-link d-flex align-items-center justify-content-center"}
                  nextLinkClassName={"page-link d-flex align-items-center justify-content-center"}
                  pageLinkClassName="page-link d-flex align-items-center justify-content-center"
                  disabledClassName={"disabled"}
               />
            </div>
         </div>
      </div>
   );
};

export default Pagination;
