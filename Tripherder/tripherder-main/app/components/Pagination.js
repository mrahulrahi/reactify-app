import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({ placesList, onHandleNextPage }) => {
   const PER_PAGE = 20;

   const pageCount = Math?.ceil(placesList?.total / PER_PAGE);

   const handlePageChange = ({ selected: selectedPage }) => {
      onHandleNextPage(selectedPage + 1);
   };

   return (
      <div className="pagination-wrapper d-flex align-items-center">
         <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            key={`paginate${placesList?.offset}`}
            forcePage={placesList?.offset / 20}
            pageRangeDisplayed={2}
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
   );
};

export default Pagination;
