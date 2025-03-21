import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import { useParams, useSearchParams } from 'react-router';  // If you're using react-router
import Hero from "../../components/Hero";

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
        <Hero 
        title="User Management" 
        subTitle="Users" 
        gradientColor1="from-indigo-600" 
        gradientColor2="to-violet-400" 
      />
      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="w-1/2 mx-auto">
              <h2>Book Registration</h2>
              <form className="mt-12" name="Display">
                <div className="form-group flex items-center justify-between mb-6">
                  <label className="form-label flex-shrink-0">Member Name</label>
                  <input type="text" className="form-control flex-grow-1" id="mname" name="mname" placeholder='Enter your name' />
                </div>
                <div className="form-group flex items-center justify-between mb-6">
                  <label className="form-label flex-shrink-0">Email Address</label>
                  <input type="text" className="form-control flex-grow-1" id="email" name="email" placeholder='Enter your email address' />
                </div>
                <div className="form-group flex items-center justify-between mb-6">
                  <label className="form-label flex-shrink-0">Phone No.</label>
                  <input type="text" className="form-control flex-grow-1" id="phone" name="phone" placeholder='Enter your phone number' />
                </div>

                <div className="form-group flex items-center justify-between mb-6">
                  <label className="form-label flex-shrink-0">No. of Books</label>
                  <input type="text" className="form-control flex-grow-1" id="noOfBooks" name="noOfBooks" placeholder='Enter no. of books' />
                </div>

                <div className="errorcss">
                  <label id="blankLabel"></label>
                </div>
                <div className="form-group flex"><input className="btn btn-primary ms-auto" type="submit" value="Create" /></div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <UserTable sortOrder={sortOrder} />

    

      <div className="content-container">
        <div className="container">
          <div className="px-4">
          <h1>{`Product Page ${slug ? slug : ''}`}</h1> {/* Display the slug from the URL */}
          </div>
          <div className="flex flex-wrap -mb-6">
            {products.map((product) => (
              <div className="w-4/12 px-3 mb-6" key={product.id}>
                <div className="card flex flex-col h-full bg-white/10 border border-[#ccc] rounded-xl">
                  <div className="w-full h-[406px] aspect-square bg-white p-6">
                    <img className="w-full h-full object-contain" src={product.image} alt="Product" />
                  </div>
                  <div className="p-8">
                  <div className="badge text-bg-dark">{product.id}</div>
                  <h3 className="card-title line-clamp-3">{product.title}</h3>
                  <p className="card-text line-clamp-3">{product.description}</p>
                  <div className="flex justify-between mb-12">
                    <div className="badge text-bg-dark">{product.category}</div>
                    <div className="badge text-bg-dark">{product.price} $</div>
                  </div>
                  <div className="card-actions mt-auto">
                    <a href={`/products/${product.id}`} className="btn btn-primary">Open</a>
                  </div>
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
