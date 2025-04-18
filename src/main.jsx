import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router'; // Make sure to import from react-router-dom
import './index.css';
import App from './App.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './pages/home/productSingle.jsx';
import Blog from './pages/blog/blogs.jsx';
import BlogPost from './pages/blog/blogSingle.jsx';
import NotFound from './pages/NotFound.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Create a client
const queryClient = new QueryClient();

// Main React App rendering
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Routes>
            {/* Home Route */}
            <Route path="/">
              <Route index element={<App />} />
              <Route path="products/:pid" element={<Product />} />  {/* Dynamic product page route */}
            </Route>

            {/* Blog Routes */}
            <Route path="blog">
              <Route index element={<Blog />} />  {/* Default Blog route */}
              <Route path=":blogId" element={<BlogPost />} />  {/* Dynamic BlogPost route */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);