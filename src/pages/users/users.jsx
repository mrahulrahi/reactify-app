import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import { useParams, useSearchParams } from 'react-router';  // If you're using react-router

const UserPage = () => {
  const [searchParams] = useSearchParams(); // Get query params from the URL
  const sortOrder = searchParams.get('sortOrder'); // Get sortOrder from query params
    const { slug } = useParams(); // Get slug from the URL params
  
    const [products, setProducts] = useState([]);

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
      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h2>Book Registration</h2>
              <form className="mt-5" name="Display">
                <div className="form-group d-flex align-items-center justify-content-between mb-4">
                  <label className="form-label flex-shrink-0">Member Name</label>
                  <input type="text" className="form-control flex-grow-1" id="mname" name="mname" placeholder='Enter your name' />
                </div>
                <div className="form-group d-flex align-items-center justify-content-between mb-4">
                  <label className="form-label flex-shrink-0">Email Address</label>
                  <input type="text" className="form-control flex-grow-1" id="email" name="email" placeholder='Enter your email address' />
                </div>
                <div className="form-group d-flex align-items-center justify-content-between mb-4">
                  <label className="form-label flex-shrink-0">Phone No.</label>
                  <input type="text" className="form-control flex-grow-1" id="phone" name="phone" placeholder='Enter your phone number' />
                </div>

                <div className="form-group d-flex align-items-center justify-content-between mb-4">
                  <label className="form-label flex-shrink-0">No. of Books</label>
                  <input type="text" className="form-control flex-grow-1" id="noOfBooks" name="noOfBooks" placeholder='Enter no. of books' />
                </div>

                <div className="errorcss">
                  <label id="blankLabel"></label>
                </div>
                <div className="form-group d-flex"><input className="btn btn-primary ms-auto" type="submit" value="Create" /></div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <UserTable sortOrder={sortOrder} />

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
    </>
  );
}

export default UserPage;
