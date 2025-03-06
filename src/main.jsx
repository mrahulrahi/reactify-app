import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router'; // Make sure to import from react-router-dom
import './index.css';
import App from './App.jsx';
import About from './pages/About.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import UsersHome from './pages/users/page';
import User from './pages/users/[id]/page';
import Blog from './pages/blog/blogs.jsx';  
import BlogPost from './pages/blog/blogSingle.jsx';

// Main React App rendering
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<App />} />
        
        {/* About Route */}
        <Route path="/about" element={<About />} />
        
        {/* Users Routes */}
        <Route path="users">
          <Route index element={<UsersHome />} />  {/* Default Users route */}
          <Route path=":uid" element={<User />} />  {/* Dynamic user page route */}
        </Route>

        {/* Blog Routes */}
        <Route path="blog">
          <Route index element={<Blog />} />  {/* Default Blog route */}
          <Route path=":blogId" element={<BlogPost />} />  {/* Dynamic BlogPost route */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);