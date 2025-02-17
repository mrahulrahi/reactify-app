'use client'
import Link from 'next/link'
import Button from "./components/Button";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegFaceGrinHearts } from "react-icons/fa6";
import { FaHeartPulse } from "react-icons/fa6";
import LikeButton from "./components/LikeButton";
import ListGroup, { Item } from "./components/ListGroup";
import Counter from "./components/Counter";
import { useState } from "react";
import ListItemTable from "./components/ListItemTable";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import Form from "./components/Form";

export default function Home() {
  const cards = [
    { title: 'User', href: '/users' },
    { title: 'Blog', href: '/blog' },
  ]

  const [cities, setNewCity] = useState([{ id: 1, name: 'Lucknow', distance: 200 }, { id: 2, name: 'Delhi', distance: 600 }, { id: 3, name: 'Kolkata', distance: 900 }, { id: 4, name: 'Mumbai', distance: 1400 }, { id: 5, name: 'Lakhimpur', distance: 100 }])
  const [foods, setNewFood] = useState([{ id: 1, name: 'Pizza', price: 20 }, { id: 2, name: 'Burger', price: 15 }, { id: 3, name: 'Chilli Potato', price: 10 }, { id: 4, name: 'Momos', price: 5 }])

  const [city, setCity] = useState({});
  const [food, setFood] = useState({});

  let [likeBtn1, setLikedBtn1] = useState({ title: 'Like', icon: <FaRegHeart /> })
  let [likeBtn2, setLikedBtn2] = useState({ title: 'Follow', icon: <SlUserFollow /> })

  const handleSelectCity = (item: Item,) => {
    setCity(item);
  }

  const handleSelectFood = (item: Item) => {
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

      <div className="content-container">
        <div className="container">
          <div className="row g-5">
            {cards.map((card, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <h2 className="card-title mb-4">{card.title}</h2>
                  <div className="card-actions">
                    <Link className='btn btn-primary' href={card.href}>Open</Link>
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
              <div className="d-flex flex-wrap gap-20">
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
              <div className="d-flex flex-wrap gap-20">
                <LikeButton title={likeBtn1.title} style="secondary" size="sm" hasIcon={likeBtn1.icon} onLikeItem={handleLikeItem1} />
                <LikeButton title={likeBtn2.title} style="secondary" size="sm" hasIcon={likeBtn2.icon} onLikeItem={handleLikeItem2} />
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="heading">Form</div>
              <div className="d-flex flex-wrap gap-20">
                <Form />
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="heading">List Group</div>
              <div className="d-flex gap-20">
                <ListGroup items={cities} heading="Cities" onSelectItem={handleSelectCity} />
                <ListGroup items={foods} heading="Foods" onSelectItem={handleSelectFood} />
              </div>
              <div className="d-flex gap-20 mt-5">
                <div className="w-50">
                  <ListItemTable data={city} />
                </div>
                <div className="w-50">
                  <ListItemTable data={food} />
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="heading">Counter</div>
              <div className="d-flex flex-wrap gap-20">
                <Counter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
