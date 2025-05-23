import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import ProductDetails from '../pages/ProductDetails.jsx';
import Cart from '../pages/Cart.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { CartContext } from '../contexts/CartContext.jsx';

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <CartContext.Provider value={[cart, setCart]}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </BrowserRouter>
  );
}
