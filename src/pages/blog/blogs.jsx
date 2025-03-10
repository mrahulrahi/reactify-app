import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { Link } from "react-router"; // Fixed the import
import Hero from "../../components/Hero";

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch blogs using React Query
  const fetchBlogs = async (page) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
      { cache: 'no-store' }
    );
    const total = parseInt(res.headers.get("x-total-count") || "0", 10);
    const data = await res.json();
    return { data, total };
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', currentPage],
    queryFn: () => fetchBlogs(currentPage),
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  if (isLoading) {
    return <div className="content-container">Loading blogs...</div>;
  }

  if (isError) {
    return <div className="content-container">Error: {error.message}</div>;
  }

  const pageCount = Math.ceil(data.total / limit);
  const blogs = data.data;

  return (
    <>
      <Hero 
        title="From the blog" 
        subTitle="Blog" 
        gradientColor1="from-third" 
        gradientColor2="to-fourth" 
      />

      <div className="content-container">
        <div className="container">
          <div className="flex flex-wrap">
            {blogs.map((blog) => (
              <div className="w-1/2 px-3" key={blog.id}>
                <div className="card flex flex-col h-full">
                  <div className="badge text-bg-dark">{blog.id}</div>
                  <h3 className="card-title line-clamp-2">{blog.title}</h3>
                  <p className="card-text line-clamp-3">{blog.body}</p>
                  <div className="card-actions justify-start mt-auto">
                    <Link to={`/blog/${blog.id}`} className="btn btn-primary">Open</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          forcePage={currentPage - 1}  // Keep pagination in sync with current page
        />
      </div>
    </>
  );
};

export default BlogPage;