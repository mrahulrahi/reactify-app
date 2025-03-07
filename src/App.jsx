/* eslint-disable no-unused-vars */
import Button from "./components/Button";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegFaceGrinHearts } from "react-icons/fa6";
import { FaHeartPulse } from "react-icons/fa6";
import LikeButton from "./components/LikeButton";
import ListGroup from "./components/ListGroup";
import Counter from "./components/Counter";
import { useState } from "react";
import ListItemTable from "./components/ListItemTable";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import Form from "./components/Form";
import Hero from "./components/Hero";



function App() {
  const cards = [
    { title: 'User', href: '/users' },
    { title: 'Blog', href: '/blog' },
  ]

  const [cities, setCities] = useState([{ id: 1, name: 'Lucknow', distance: 200 }, { id: 2, name: 'Delhi', distance: 600 }, { id: 3, name: 'Kolkata', distance: 900 }, { id: 4, name: 'Mumbai', distance: 1400 }, { id: 5, name: 'Lakhimpur', distance: 100 }])
  const [foods, setNewFood] = useState([{ id: 1, name: 'Pizza', price: 20 }, { id: 2, name: 'Burger', price: 15 }, { id: 3, name: 'Chilli Potato', price: 10 }, { id: 4, name: 'Momos', price: 5 }])

  const [city, setCity] = useState({});
  const [food, setFood] = useState({});

  let [likeBtn1, setLikedBtn1] = useState({ title: 'Like', icon: <FaRegHeart /> })
  let [likeBtn2, setLikedBtn2] = useState({ title: 'Follow', icon: <SlUserFollow /> })

  const handleSelectCity = (item) => {
    setCity(item);
  }

  const handleSelectFood = (item) => {
    setFood(item);
  }

  function handleLikeItem1() {
    setLikedBtn1(likeBtn1.title === 'Like' ? { title: 'Liked', icon: <FaHeart /> } : { title: 'Like', icon: <FaRegHeart /> });
  }

  function handleLikeItem2() {
    setLikedBtn2(likeBtn2.title === 'Follow' ? { title: 'Unfollow', icon: <SlUserUnfollow /> } : { title: 'Follow', icon: <SlUserFollow /> });
  }

  return (
    <>
      <Hero title="Welcome to Reactify App" subTitle="Home" gradientColor1="red-400" gradientColor2="amber-300" />

      <div className="content-container">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Home Page
          </h1>
          <p className="text-gray-600">
            This is a React application with Tailwind CSS
          </p>
          <section className="flex flex-row !mb-5">
            <div className="w-1/2 mb-8">
              <h2 className="text-3xl font-semibold text-white">Our Features</h2>
              <ul className="mt-4 space-y-2">
                <li className="text-white">Feature 1: Description of feature 1</li>
                <li className="text-white">Feature 2: Description of feature 2</li>
                <li className="text-white">Feature 3: Description of feature 3</li>
              </ul>
            </div>
            <div className="w-1/2 mb-8">
              <h2 className="text-3xl font-semibold text-white">Our Services</h2>
              <ul className="mt-4 space-y-2">
                <li className="text-white">Service 1: Description of service 1</li>
                <li className="text-white">Service 2: Description of service 2</li>
                <li className="text-white">Service 3: Description of service 3</li>
              </ul>
            </div>
          </section>

          <a href="#!" className="btn btn-primary">Button</a>
        </div>
      </div>

      <div className="content-container">
        <div className="container">
          <div className="flex flex-wrap">
            {cards.map((card, index) => (
              <div className="w-1/2" key={index}>
                <div className="card">
                  <h2 className="card-title mb-4">{card.title}</h2>
                  <div className="card-actions">
                    <a className='btn btn-primary' href={card.href}>Open</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-container" id='styleguide'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading">All Button Type</div>
              <div className="flex flex-wrap gap-20">
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

            <div className="col-12 mt-5">
              <div className="heading">Like Button</div>
              <div className="flex flex-wrap gap-20">
                <LikeButton title={likeBtn1.title} style="secondary" size="sm" hasIcon={likeBtn1.icon} onLikeItem={handleLikeItem1} />
                <LikeButton title={likeBtn2.title} style="secondary" size="sm" hasIcon={likeBtn2.icon} onLikeItem={handleLikeItem2} />
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="heading">Form</div>
              <div className="flex flex-wrap gap-20">
                <Form />
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="heading">List Group</div>
              <div className="flex gap-20">
                <ListGroup items={cities} heading="Cities" onSelectItem={handleSelectCity} />
                <ListGroup items={foods} heading="Foods" onSelectItem={handleSelectFood} />
              </div>
              <div className="flex gap-20 mt-5">
                <div className="w-1/2">
                  <ListItemTable data={city} />
                </div>
                <div className="w-1/2">
                  <ListItemTable data={food} />
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="heading">Counter</div>
              <div className="flex flex-wrap gap-20">
                <Counter />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
