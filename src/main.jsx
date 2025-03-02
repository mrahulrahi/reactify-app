import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import About from './pages/About.jsx'
import Header from './components/Header'
import Footer from './components/Footer'
import UsersHome from './pages/users/page'
import User from './pages/users/[id]/page'
import Blog from './pages/blog/page'  
import BlogPost from './pages/blog/[id]/page'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="projects">
          <Route index element={<UsersHome />} />
          <Route path=":uid" element={<User />} />
        </Route>
        <Route path="blog">
          <Route index element={<Blog />} />
          <Route path=":bid" element={<BlogPost />} />
        </Route>
      </Routes>
      <Footer />
    </StrictMode>
  </BrowserRouter>
);
