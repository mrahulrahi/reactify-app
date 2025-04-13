/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // If you're using react-router
import Hero from "./components/Hero";
import Button from "./components/Button";
import LikeButton from "./components/LikeButton";
import ListGroup from "./components/ListGroup";
import Counter from "./components/Counter";
import Form from "./components/Form";
import ListItemTable from "./components/ListItemTable";
import { FaRegHeart, FaHeart, FaRegFaceGrinHearts, FaHeartPulse } from "react-icons/fa6";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";

function App() {
  const cards = [
    { title: 'Blog', href: '/blog' },
    { title: 'Style Guide', href: '#styleguide' },
    { title: 'Products', href: '#products' },
  ];

  const [cities, setCities] = useState([
    { id: 1, name: 'Lucknow', distance: 200 },
    { id: 2, name: 'Delhi', distance: 600 },
    { id: 3, name: 'Kolkata', distance: 900 },
    { id: 4, name: 'Mumbai', distance: 1400 },
    { id: 5, name: 'Lakhimpur', distance: 100 },
  ]);
  const [users, setUsers] = useState([]);

  const [city, setCity] = useState({});
  const [user, setUser] = useState({});

  const [products, setProducts] = useState([]);

  // Fetching data when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs only once on mount

  let [likeBtn1, setLikedBtn1] = useState({ title: 'Like', icon: <FaRegHeart /> });
  let [likeBtn2, setLikedBtn2] = useState({ title: 'Follow', icon: <SlUserFollow /> });

  const handleSelectCity = (item) => {
    console.log("Selected City:", item);
    setCity(item); // Set the selected city
    setUser({});   // Clear the user state
  };

  const handleSelectUser = (item) => {
    console.log("Selected User:", item);
    setUser(item); // Set the selected user
    setCity({});   // Clear the city state
  };

  function handleLikeItem1() {
    setLikedBtn1(
      likeBtn1.title === 'Like'
        ? { title: 'Liked', icon: <FaHeart /> }
        : { title: 'Like', icon: <FaRegHeart /> }
    );
  }

  function handleLikeItem2() {
    setLikedBtn2(
      likeBtn2.title === 'Follow'
        ? { title: 'Unfollow', icon: <SlUserUnfollow /> }
        : { title: 'Follow', icon: <SlUserFollow /> }
    );
  }

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
      <Hero title="Welcome to Reactify App" subTitle="Home" gradientColor1="from-red-400" gradientColor2="to-amber-300" />

      <div className="content-container">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Home Page
          </h1>
          <p>
            This is a React application with Tailwind CSS
          </p>
          <section className="flex flex-row !mb-5">
            <div className="w-1/2 mb-8">
              <h2 className="text-3xl font-semibold text-white">Our Features</h2>
              <ul className="mt-4 space-y-2">
                <li className="text-white relative pl-4 before:content-[''] before:inline-block before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:rounded-full before:bg-third">Feature 1: Description of feature 1</li>
                <li className="text-white relative pl-4 before:content-[''] before:inline-block before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:rounded-full before:bg-third">Feature 2: Description of feature 2</li>
                <li className="text-white relative pl-4 before:content-[''] before:inline-block before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:rounded-full before:bg-third">Feature 3: Description of feature 3</li>
              </ul>
            </div>
            <div className="w-1/2 mb-8">
              <h2 className="text-3xl font-semibold text-white">Our Services</h2>
              <ul className="mt-4 space-y-2">
                <li className="text-white relative pl-4 before:content-[''] before:inline-block before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:rounded-full before:bg-third">Service 1: Description of service 1</li>
                <li className="text-white relative pl-4 before:content-[''] before:inline-block before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:rounded-full before:bg-third">Service 2: Description of service 2</li>
                <li className="text-white relative pl-4 before:content-[''] before:inline-block before:w-1 before:h-1 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:rounded-full before:bg-third">Service 3: Description of service 3</li>
              </ul>
            </div>
          </section>

        </div>
      </div>

      <div className="content-container">
        <div className="container">
          <div className="flex flex-wrap">
            {cards.map((card, index) => (
              <div className="w-1/4 px-3" key={index}>
                <Link className="card w-full p-8 bg-white/10 border border-[#ccc] rounded-xl" to={card.href} >
                  <h2 className="card-title text-white mb-0">{card.title}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-container" id='styleguide'>
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-8/12 px-3">
              <div className="bg-white/10 p-8 rounded-xl h-full">
                <div className="heading">All Button Type</div>
                <div className="flex flex-wrap gap-5">
                  <Button title="Primary SM" style="primary" size="sm" />
                  <Button title="Primary" style="primary" />
                  <Button title="Primary LG" style="primary" size="lg" />
                  <Button title="Secondary SM" style="secondary" size="sm" />
                  <Button title="Secondary" style="secondary" />
                  <Button title="Secondary LG" style="secondary" size="lg" />
                  <Button title="Outline SM" style="outline" size="sm" />
                  <Button title="Outline" style="outline" />
                  <Button title="Like" style="primary" size="sm" hasIcon={<FaRegHeart />} />
                  <Button title="Like" style="secondary" size="sm" hasIcon={<FaHeart />} />
                  <Button title="Like" style="primary" size="sm" hasIcon={<FaRegFaceGrinHearts />} />
                  <Button title="Like" style="secondary" size="sm" hasIcon={<FaHeartPulse />} />
                </div>
              </div>
            </div>

            <div className="w-4/12 px-3">
              <div className="flex flex-col gap-5">
                <div className="bg-white/10 p-8 rounded-xl">
                  <div className="heading">Like Button</div>
                  <div className="flex flex-wrap gap-5">
                    <LikeButton title={likeBtn1.title} style="secondary" size="sm" hasIcon={likeBtn1.icon} onLikeItem={handleLikeItem1} />
                    <LikeButton title={likeBtn2.title} style="secondary" size="sm" hasIcon={likeBtn2.icon} onLikeItem={handleLikeItem2} />
                  </div>
                </div>


                <div className="bg-white/10 p-8 rounded-xl">
                  <div className="heading">Counter</div>
                  <div className="flex flex-wrap gap-5">
                    <Counter />
                  </div>
                </div>
              </div>

            </div>

            <div className="w-6/12 px-3 mt-10">
              <div className="bg-white/10 p-8 rounded-xl">
                <div className="heading">Form</div>
                <div className="flex flex-wrap gap-5">
                  <Form />
                </div>

              </div>

            </div>

            <div className="w-6/12 px-3 mt-10">
              <div className="heading">Book Registration</div>
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



            <div className="w-full mt-10">
              <div className="heading">List Group</div>
              <div className="flex gap-5">
                <ListGroup items={users || []} heading="Users" onSelectItem={handleSelectUser} />
                <ListGroup items={cities || []} heading="Cities" onSelectItem={handleSelectCity} />
              </div>
              <div className="flex gap-5 mt-10">
                <div className="w-full">
                  <ListItemTable data={Object.keys(city).length > 0 ? city : user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container" id="products">
        <div className="container">
          <div className="px-4">
            <h2>Product Page</h2>
          </div>
          <div className="flex flex-wrap -mb-6">
            {products.map((product) => (
              <div className="w-3/12 px-3 mb-6" key={product.id}>
                <Link className="card flex flex-col h-full bg-white/10 border border-[#ccc] rounded-xl overflow-hidden" to={`/products/${product.id}`} >
                  <div className="w-full h-[300px] aspect-square bg-white p-6">
                    <img className="w-full h-full object-contain" src={product.image} alt="Product" />
                  </div>
                  <div className="flex flex-col p-5 grow">
                    <div className="flex justify-between mb-5">
                      <div className="badge text-bg-dark">{product.id}</div>
                      <div className="badge text-bg-dark capitalize">{product.category}</div>
                      <div className="badge text-bg-dark">{product.price} $</div>
                    </div>
                    <div className="mt-auto">
                      <h5 className="card-title text-white line-clamp-2">{product.title}</h5>
                      <p className="card-text line-clamp-3">{product.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
