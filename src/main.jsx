import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import About from './pages/About.jsx'
import Header from './components/Header'
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </StrictMode>
  </BrowserRouter>
);
