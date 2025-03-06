import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams, Link } from "react-router"; // Use react-router-dom Link instead of react-router


const BlogPage = () => {
  const { slug } = useParams(); // Get slug from the URL params

  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const limit = 10;

  // Fetch blogs
  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`, { cache: 'no-store' });
      const data = await res.json();
      const total = parseInt(res.headers.get("x-total-count") || "0", 10);
      setPageCount(Math.ceil(total / limit));
      setItems(data);
    };
    getBlogs();
  }, [limit]);

  const fetchBlogs = async (currentPage) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    const blogsFromServer = await fetchBlogs(currentPage);
    setItems(blogsFromServer);
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
      const productsData = await res.json();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>{`Product Page ${slug ? slug : ''}`}</h1> {/* Display the slug from the URL */}

      <div className="content-container">
        <div className="container">
          <div className="flex flex-wrap">
            {products.map((product) => (
              <div className="w-4/12 px-4" key={product.id}>
                <div className="card flex flex-col h-full shadow-xl">
                  <div className="w-full aspect-square">
                    <img className="w-full h-full object-contain" src={product.image} alt="Product" />
                  </div>
                  <div className="badge text-bg-dark">{product.id}</div>
                  <h3 className="card-title line-clamp-3">{product.title}</h3>
                  <p className="card-text line-clamp-3">{product.description}</p>
                  <div className="flex justify-content-between mb-5">
                    <div className="badge text-bg-dark">{product.category}</div>
                    <div className="badge text-bg-dark">{product.price} $</div>
                  </div>
                  <div className="card-actions mt-auto">
                    <a href={`/products/${product.id}`} className="btn btn-primary">Open</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="container">
          <div className="flex flex-wrap">
            {items.map((blog) => (
              <div className="w-1/2 px-3" key={blog.id}>
                <div className="card flex flex-col h-full">
                  <div className="badge text-bg-dark">{blog.id}</div>
                  <h3 className="card-title line-clamp-2">{blog.title}</h3>
                  <p className="card-text line-clamp-3">{blog.body}</p>
                  <div className="card-actions justify-start mt-auto">
                    <Link to={`/blog/${blog.id}`} className="btn btn-primary">Open</Link> {/* Navigate to the blog details */}
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
        />
      </div>
    </>
  );
};

export default BlogPage;
